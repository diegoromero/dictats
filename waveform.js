// Browser-native waveform editor. No service, build step, or external library.
let waveContext, wavePeaks=null, waveRequest=0, waveSource=null;
const waveCache=new Map();

async function waveformAudioBytes(source){
 // Decode embedded recordings directly; file:// pages cannot fetch local files.
 if(/^data:audio\/[^;,]+;base64,/.test(source)){
  const binary=atob(source.slice(source.indexOf(',')+1));
  return Uint8Array.from(binary,char=>char.charCodeAt(0)).buffer;
 }
 const response=await fetch(source);
 if(!response.ok)throw Error('Audio could not be loaded');
 return response.arrayBuffer();
}

async function loadWaveform(){
 const request=++waveRequest, source=PHRASES[phrase].audio;
 if(source!==waveSource){wavePeaks=null;waveSource=source;$('waveScroll').scrollLeft=0;}
 if($('editorArea').classList.contains('hidden'))return;
 $('waveStatus').textContent='Loading audio waveform…';
 drawWaveform();
 try{
  if(!waveCache.has(source)){
   const pending=(async()=>{
    const bytes=await waveformAudioBytes(source);
    waveContext ||= new (window.AudioContext||window.webkitAudioContext)();
    const buffer=await waveContext.decodeAudioData(bytes);
    // Keep a compact min/max envelope rather than retaining decoded audio.
    const count=6000, peaks=new Float32Array(count*2);
    for(let channel=0;channel<buffer.numberOfChannels;channel++){
     const samples=buffer.getChannelData(channel);
     for(let i=0;i<count;i++){
      const start=Math.floor(i*samples.length/count), end=Math.floor((i+1)*samples.length/count);
      for(let j=start;j<end;j++){
       peaks[i*2]=Math.min(peaks[i*2],samples[j]);
       peaks[i*2+1]=Math.max(peaks[i*2+1],samples[j]);
      }
     }
    }
    return peaks;
   })();
   waveCache.set(source,pending);
   pending.catch(()=>waveCache.delete(source));
  }
  const peaks=await waveCache.get(source);
  if(request!==waveRequest)return;
  wavePeaks=peaks;
  $('waveStatus').textContent='Waveform ready · timing changes save automatically in this browser.';
  resizeWaveform();
 }catch(error){
  if(request!==waveRequest)return;
  $('waveStatus').textContent='Waveform unavailable. Try reopening the page in a browser that supports Ogg audio decoding. You can still edit word times below.';
 }
}

function resizeWaveform(){
 if($('editorArea').classList.contains('hidden'))return;
 const width=Math.max(700,$('waveScroll').clientWidth-64)*Number($('waveZoom').value);
 $('waveTrack').style.width=width+'px';
 drawWaveform();syncWaveform();
}

function drawWaveform(){
 const canvas=$('waveCanvas'),width=$('waveTrack').clientWidth;
 if(!width)return;
 const ratio=window.devicePixelRatio||1;
 canvas.width=Math.round(width*ratio);canvas.height=Math.round(300*ratio);
 const ctx=canvas.getContext('2d');ctx.scale(ratio,ratio);
 const duration=PHRASES[phrase].duration;
 ctx.font='11px system-ui';ctx.fillStyle='#6c7d96';ctx.strokeStyle='#dce3ee';
 const step=Number($('waveZoom').value)>=2?0.25:0.5;
 for(let t=0;t<=duration;t+=step){
  const x=t/duration*width;
  ctx.beginPath();ctx.moveTo(x,40);ctx.lineTo(x,206);ctx.stroke();
  ctx.fillText(t.toFixed(2)+'s',x+3,286);
 }
 ctx.strokeStyle='#b7c7de';ctx.beginPath();ctx.moveTo(0,127);ctx.lineTo(width,127);ctx.stroke();
 if(!wavePeaks)return;
 const count=wavePeaks.length/2;
 let max=0.01;for(const value of wavePeaks)max=Math.max(max,Math.abs(value));
 ctx.strokeStyle='#557bc4';ctx.lineWidth=1;
 ctx.beginPath();
 for(let x=0;x<width;x++){
  const first=Math.floor(x/width*count),last=Math.min(count,Math.ceil((x+1)/width*count));
  let low=0,high=0;
  for(let i=first;i<last;i++){low=Math.min(low,wavePeaks[2*i]);high=Math.max(high,wavePeaks[2*i+1]);}
  ctx.moveTo(x,127+low/max*64);ctx.lineTo(x,127+high/max*64);
 }
 ctx.stroke();
}

function renderWaveRegions(){
 const root=$('waveRegions');root.replaceChildren();
 words(phrase).forEach((word,i)=>{
  const region=document.createElement('div');region.className='wave-region';
  const label=document.createElement('button');label.className='wave-label';label.textContent=word;
  label.title=`Select ${word}`;label.setAttribute('aria-label',`Edit timing for ${word}`);
  // Alternate label rows so short adjacent words stay easy to select.
  label.style.top=(i%2?190:163)+'px';
  label.onclick=()=>{chosen=[i,i];rangeAnchor=null;updateRangeHint();paint();};
  region.append(label);root.append(region);
 });
 syncWaveform();
}

function syncWaveform(){
 const duration=PHRASES[phrase].duration;
 const percent=t=>Math.max(0,Math.min(100,t/duration*100))+'%';
 $('waveRegions').querySelectorAll('.wave-region').forEach((el,i)=>{
  // The sentence paints once before the previous phrase's regions are rebuilt.
  if(!times[phrase][i])return;
  const [start,end]=times[phrase][i];
  el.style.left=percent(start);el.style.width=Math.max(0,(end-start)/duration*100)+'%';
  el.classList.toggle('selected',i===chosen[0]);
  el.firstChild.setAttribute('aria-pressed',String(i===chosen[0]));
 });
 const index=chosen[0],[start,end]=times[phrase][index],word=words(phrase)[index];
 [$('waveStart'),$('waveEnd')].forEach((handle,boundary)=>{
  const value=boundary===0?start:end;
  handle.style.left=percent(value);
  handle.setAttribute('aria-label',`${word} ${boundary===0?'start':'end'}`);
  handle.setAttribute('aria-valuenow',value.toFixed(2));
  handle.setAttribute('aria-valuemin',boundary===0?'0':(start+0.01).toFixed(2));
  handle.setAttribute('aria-valuemax',(boundary===0?end-0.01:duration).toFixed(2));
  handle.setAttribute('aria-valuetext',value.toFixed(2)+' seconds');
 });
 $('waveSelection').textContent=`${word} · ${start.toFixed(2)}–${end.toFixed(2)} s`;
 $('wavePlayhead').style.left=percent(audio.currentTime);
}

function setWordBoundary(index,boundary,value){
 const pair=times[phrase][index],duration=PHRASES[phrase].duration;
 const rounded=Math.round(value*100)/100;
 if(!Number.isFinite(rounded)||rounded<0||rounded>duration||
    (boundary===0?rounded>=pair[1]:rounded<=pair[0]))return false;
 stop();pair[boundary]=rounded;persist();
 const input=$('timingRows').children[index]?.querySelectorAll('input')[boundary];
 if(input)input.value=rounded.toFixed(2);
 paint();return true;
}

function initWaveform(){
 $('waveZoom').onchange=resizeWaveform;
 $('previewWord').onclick=()=>{const [start,end]=times[phrase][chosen[0]];play(start,end);};
 $('waveCanvas').onclick=e=>{
  const rect=$('waveTrack').getBoundingClientRect();
  stop();audio.currentTime=Math.max(0,Math.min(PHRASES[phrase].duration,(e.clientX-rect.left)/rect.width*PHRASES[phrase].duration));updateProgress();
 };
 [$('waveStart'),$('waveEnd')].forEach((handle,boundary)=>{
  let drag=null;
  const move=e=>{
   if(!drag)return;
   const rect=$('waveTrack').getBoundingClientRect(),pair=times[phrase][drag.index];
   const raw=(e.clientX-rect.left)/rect.width*PHRASES[phrase].duration;
   const min=boundary===0?0:Math.ceil((pair[0]+0.01)*100)/100;
   const max=boundary===0?Math.floor((pair[1]-0.01)*100)/100:Math.floor(PHRASES[phrase].duration*100)/100;
   setWordBoundary(drag.index,boundary,Math.max(min,Math.min(max,raw)));
  };
  handle.onpointerdown=e=>{if(e.button!==0)return;e.preventDefault();stop();drag={index:chosen[0]};handle.setPointerCapture(e.pointerId);handle.focus();};
  handle.onpointermove=move;
  handle.onpointerup=e=>{move(e);drag=null;if(handle.hasPointerCapture(e.pointerId))handle.releasePointerCapture(e.pointerId);};
  handle.onpointercancel=handle.onlostpointercapture=()=>{drag=null;};
  handle.onkeydown=e=>{
   if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)){
    e.preventDefault();const direction=['ArrowRight','ArrowUp'].includes(e.key)?1:-1;
    setWordBoundary(chosen[0],boundary,times[phrase][chosen[0]][boundary]+direction*(e.shiftKey?0.1:0.01));
   }
  };
 });
 new ResizeObserver(resizeWaveform).observe($('waveScroll'));
 audio.addEventListener('timeupdate',syncWaveform);
}
