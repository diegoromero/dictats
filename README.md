# Dictats

A static dictation audio player with a selector for **Dies de la setmana** and **La castanyada**. Open `index.html` to use it. The interface starts in Spanish. Choose English from the language selector to switch languages. The browser remembers your choice, and all dictation text and audio are in Catalan.

For GitHub Pages, publish the repository root from your chosen branch under **Settings → Pages**. Include `index.html`, `i18n.js`, `waveform.js`, and `waveform.css`. Recordings are embedded in the HTML, so repository project URLs work without configuration or a build step. The `audio/` folder retains the source recordings for La castanyada.

The player remembers the selected dictation and saves word timing edits separately for each dictation in the current browser. Existing Dies de la setmana timing edits remain available. La castanyada starts with approximate word timings; refine them with the word timing editor if needed. Timing import/export applies to the selected dictation.

Open **Show editor** to see the audio waveform. Select a word under the waveform and drag its green **Start** and orange **End** handles. Use **Play selected word** to check the cut, and zoom to 2× or 4× for finer adjustments. Handles also support arrow keys (0.01 seconds; Shift for 0.1 seconds), and the numeric fields stay synchronized. Each word keeps its own boundaries, allowing gaps or overlaps between words. Start must precede end.

Waveform decoding runs in the browser and supports both dictations. You can open `index.html` directly from your computer (`file://`) to view waveforms and configure timings; no local server or internet connection is required. Keep `i18n.js`, `waveform.js` and `waveform.css` alongside the HTML. If decoding is unavailable, numeric timing editing and audio playback remain available.
