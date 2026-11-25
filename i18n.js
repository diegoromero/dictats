const messages = {
  intro: {"es":"Elige qué escuchará tu hija. Selecciona una palabra o un grupo de palabras para escucharlas o repetirlas.", "en":"Control exactly what your daughter hears. Select a word or a range, then play or repeat it."},
  choose: {"es":"Elegir dictado", "en":"Choose dictation"},
  choosePhrase: {"es":"Elegir frase", "en":"Choose phrase"},
  wordsLabel: {"es":"Palabras seleccionables", "en":"Clickable words"},
  guide: {"es":"Para seleccionar varias palabras, activa la selección de intervalo y pulsa la primera y la última. También puedes mantener pulsada Mayús al hacer clic. El azul indica la palabra que suena y el amarillo marca tu selección.", "en":"For multiple words, turn on Select range, then tap the first and last words. Shift-click also works with a keyboard. Blue follows playback; yellow marks your selection."},
  entire: {"es":"▶ Frase completa", "en":"▶ Entire phrase"},
  selection: {"es":"▶ Selección", "en":"▶ Selection"},
  slow: {"es":"0,65× lenta", "en":"0.65× slow"},
  normal: {"es":"1× normal", "en":"1× normal"},
  speed75: {"es":"0,75×", "en":"0.75×"},
  speed85: {"es":"0,85×", "en":"0.85×"},
  speed115: {"es":"1,15×", "en":"1.15×"},
  editor: {"es":"Editor de tiempos por palabra", "en":"Word timing editor"},
  editorHint: {"es":"Si lo necesitas, ajusta en segundos el inicio y el final de cada palabra.", "en":"Optional: fix approximate word positions in seconds."},
  zoom: {"es":"Zoom", "en":"Zoom"},
  preview: {"es":"▶ Escuchar la palabra seleccionada", "en":"▶ Play selected word"},
  waveHelp: {"es":"Selecciona una palabra bajo la onda y arrastra el marcador verde de inicio o el naranja de fin. Pulsa la onda para ir a ese punto. Amplía la vista para ajustar con precisión y desplázate horizontalmente para ver más. Con un marcador seleccionado, usa ←/→ para moverlo 0,01 s o Mayús + ←/→ para moverlo 0,1 s.", "en":"Select a word below the waveform, then drag its green start and orange end handles. Click the waveform to seek. Zoom in for precision; scroll sideways to see more. Focus a handle and use ←/→ for 0.01 s steps (Shift: 0.1 s)."},
  start: {"es":"Inicio", "en":"Start"},
  end: {"es":"Fin", "en":"End"},
  reset: {"es":"Restablecer los tiempos de la frase", "en":"Reset phrase estimates"},
  copy: {"es":"Copiar todos los tiempos en JSON", "en":"Copy all timings as JSON"},
  import: {"es":"Importar tiempos en JSON", "en":"Import timings JSON"},
  word: {"es":"Palabra", "en":"Word"},
  startSeconds: {"es":"Inicio (s)", "en":"Start (s)"},
  endSeconds: {"es":"Fin (s)", "en":"End (s)"},
  saveHint: {"es":"Los cambios se guardan en este navegador. Para que los cortes sean precisos, deja un pequeño margen alrededor de las consonantes.", "en":"Changes are saved in this browser's local storage. For exact cuts, allow a tiny margin around consonants."},
  speed: {"es":"Velocidad de reproducción", "en":"Playback speed"},
  seek: {"es":"Desplazarse por la grabación", "en":"Seek through recording"},
  waveTrack: {"es":"Forma de onda y límites de las palabras", "en":"Audio waveform and word boundaries"},
  waveCanvas: {"es":"Forma de onda de la grabación", "en":"Audio amplitude waveform"},
  shortcuts: {"es":"Atajos de teclado. <kbd>Espacio</kbd> para pausar o reanudar, <kbd>←</kbd>/<kbd>→</kbd> para elegir la palabra anterior o siguiente y <kbd>Enter</kbd> para reproducir la selección. Al terminar el fragmento, el audio se detiene sin pasar a la frase siguiente.", "en":"Keyboard: <kbd>Space</kbd> pause/resume, <kbd>←</kbd>/<kbd>→</kbd> previous/next word, <kbd>Enter</kbd> play selection. Audio segments stop automatically and will not advance to another phrase."},
  language: {"es":"Idioma", "en":"Language"},
  player: {"es":"Reproductor para familias", "en":"Parent audio player"},
  phrase: {"es":"Frase {n}", "en":"Phrase {n}"},
  count: {"es":"{n} palabras", "en":"{n} words"},
  rangeOn: {"es":"Selección de intervalo activada", "en":"Select range: On"},
  rangeOff: {"es":"Selección de intervalo desactivada", "en":"Select range: Off"},
  tap: {"es":"Pulsa una palabra para seleccionarla.", "en":"Tap a word to select it."},
  first: {"es":"Pulsa la primera palabra…", "en":"Tap the first word…"},
  last: {"es":"Ahora pulsa la última palabra…", "en":"Now tap the last word…"},
  selectWord: {"es":"Seleccionar {word}", "en":"Select {word}"},
  playWord: {"es":"Escuchar {word}", "en":"Play {word}"},
  editWord: {"es":"Editar los tiempos de {word}", "en":"Edit timing for {word}"},
  wordStart: {"es":"Inicio de {word}", "en":"Start of {word}"},
  wordEnd: {"es":"Fin de {word}", "en":"End of {word}"},
  wordStartSeconds: {"es":"Inicio de {word} en segundos", "en":"Start of {word} in seconds"},
  wordEndSeconds: {"es":"Fin de {word} en segundos", "en":"End of {word} in seconds"},
  seconds: {"es":"{n} segundos", "en":"{n} seconds"},
  pause: {"es":"⏸ Pausar", "en":"⏸ Pause"},
  resume: {"es":"▶ Reanudar", "en":"▶ Resume"},
  repeatOn: {"es":"↻ Repetición activada", "en":"↻ Repeat on"},
  repeatOff: {"es":"↻ Repetición desactivada", "en":"↻ Repeat off"},
  show: {"es":"Mostrar editor", "en":"Show editor"},
  hide: {"es":"Ocultar editor", "en":"Hide editor"},
  audioError: {"es":"No se ha podido reproducir el audio.", "en":"Could not play audio."},
  confirmReset: {"es":"¿Quieres restablecer los tiempos originales de esta frase?", "en":"Restore the original timings for this phrase?"},
  copied: {"es":"Se han copiado los tiempos en JSON.", "en":"Copied timings JSON."},
  copyPrompt: {"es":"Copia los tiempos en JSON:", "en":"Copy timings JSON:"},
  paste: {"es":"Pega los tiempos del dictado seleccionado en formato JSON:", "en":"Paste timing arrays for the selected dictation as JSON:"},
  invalid: {"es":"Los tiempos no son válidos. Comprueba el formato JSON e incluye el inicio y el fin de cada palabra de todas las frases.", "en":"Invalid timings. Check the JSON format and include a start and end for each word in every phrase."},
  loading: {"es":"Cargando la forma de onda…", "en":"Loading audio waveform…"},
  ready: {"es":"Forma de onda lista. Los ajustes de tiempo se guardan automáticamente en este navegador.", "en":"Waveform ready · timing changes save automatically in this browser."},
  unavailable: {"es":"La forma de onda no está disponible. Puedes editar los tiempos de las palabras en la tabla.", "en":"Waveform unavailable. You can still edit word times below."},
};

let language = 'es';
try {
  if (localStorage.getItem('dictat-ui-language') === 'en') language = 'en';
} catch {}

function t(key, values) {
  const message = messages[key][language];
  return values ? message.replace(/\{(\w+)\}/g, (_, name) => values[name]) : message;
}

function translatePage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach(el => el.textContent = t(el.dataset.i18n));
  document.querySelectorAll('[data-i18n-label]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nLabel)));
  // Only the built-in keyboard guide contains markup.
  document.querySelector('.footnote').innerHTML = t('shortcuts');
}
