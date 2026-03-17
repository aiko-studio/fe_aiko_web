<script>
  import { onMount, getContext } from "svelte";
  import monacoDefined from "../lib/monacoDefined";
  import AIKO_EXAMPLES from  "../lib/examples";
  import ASM_DOCS from "../lib/asmDocs";

  const API_URL = import.meta.env.VITE_API_URL;

  // --- 1. AMBIL STATE DARI LAYOUT (Context) ---
  // Pastikan key 'THEME_CTX' sama dengan yang ada di +layout.svelte
  const themeCtx = getContext('THEME_CTX');
  
  // Helper untuk membaca state theme dengan aman
  // Jika context tidak ditemukan (misal dijalankan tanpa layout), default ke true (Dark)
  const isDark = $derived(themeCtx?.isDark ?? true);

  // Element Bindings
  let inputContainer;
  let outputContainer;
  
  // Editor Instances (Bukan state reaktif UI, jadi let biasa cukup, atau state jika butuh trigger)
  let inputEditor;
  let outputEditor;
  
  // --- 2. STATE VARIABLES (Menggunakan Runes) ---
  let isCompiling = $state(false);
  let consoleOutput = $state("Ready to transpile...");

  let terminalInput = $state(""); // Untuk menampung apa yang diketik user
  
  // New Feature States
  let fullAsmCode = $state("");       
  let sourceMap = $state([]);         // menyimpan [1, 1, ..., 2, 2]
  let headerOffset = $state(0);       // menyimpan offset (misal: 12)
  let isFiltered = $state(false);     
  let currentDecorations = []; // Tidak perlu reactive state untuk objek internal Monaco


  // Fungsi untuk memuat kode ke editor
  function loadExample(event) {
    const selectedCode = event.target.value;
    if (!selectedCode) return;

    // Konfirmasi jika editor tidak kosong (opsional)
    if (inputEditor.getValue().trim() !== "" && !confirm("Overwrite current code?")) {
      event.target.value = ""; // Reset dropdown
      return;
    }

    inputEditor.setValue(selectedCode);
    resetView(); // Reset tampilan output/highlighting
    event.target.value = ""; // Reset dropdown setelah load
  }

  // --- 3. THEME LOGIC VIA EFFECT ---
  // Mengganti toggleTheme manual dengan Effect yang memantau perubahan Context
  $effect(() => {
    // Jalankan logika ini setiap kali 'isDark' berubah
    if (window.monaco) {
        const themeName = isDark ? "vs-dark" : "vs";
        window.monaco.editor.setTheme(themeName);
        
        // Update decoration style jika ada (agar highlight warna ikut berubah)
        if (currentDecorations.length > 0 && inputEditor) {
             // Opsional: Re-apply decoration jika ingin warna highlight langsung berubah saat tema diganti
             // Namun, logic CSS class di bawah sudah menangani ini secara visual.
        }
    }
  });

  // Lifecycle
  onMount(async () => {
    // Inisialisasi Monaco dengan tema awal yang sesuai state
    const initialTheme = isDark ? "vs-dark" : "vs";
    
    // Kita asumsikan monacoDefined sudah menghandle theme di parameter ketiga atau via setOptions
    // Jika tidak, set manual setelah init.
    inputEditor = await monacoDefined(inputContainer, "var x = 10;\nprint(x);", "aiko", isDark);
    outputEditor = await monacoDefined(outputContainer, "; Assembly output will be here", "assembly", isDark);
    
    // Paksa tema saat mount agar sinkron
    if (!window.__assemblyHoverRegistered) {
      monaco.languages.registerHoverProvider('assembly', {
        provideHover: function (model, position) {
          // Ambil kata di bawah kursor
          const word = model.getWordAtPosition(position);
          if (!word) return null;
          const instruction = word.word.toUpperCase();
          const description = ASM_DOCS[instruction];
          if (description) {
            return {
              range: new monaco.Range(
                position.lineNumber,
                word.startColumn,
                position.lineNumber,
                word.endColumn
              ),
              contents: [
                { value: `**Instruction: ${instruction}**` },
                { value: description }
              ]
            };
          }
          return null;
        }
      });
      
      // Set flag menjadi true agar tidak terduplikasi saat file disave ulang (HMR)
      window.__assemblyHoverRegistered = true;
    }

    outputEditor.updateOptions({ readOnly: true });
    
    // Event Listener: Cursor Move
    inputEditor.onDidChangeCursorPosition((e) => {
      console.log("woi");
      handleCursorChange(e.position.lineNumber);
    });
  });

  // Main Compile Function
  async function run() {
    if (isCompiling) return;

    const code = inputEditor.getValue();
    const usesInput = /\binput\s*\(/.test(code);
    
    if (usesInput && terminalInput.trim() === "") {
      consoleOutput = "> [ERROR] Kode ini memerlukan input data!\n> Silakan isi data di bagian 'Standard Input' pada Terminal Console di bawah sebelum menekan tombol RUN CODE.";
      return; // Hentikan eksekusi, jangan lanjut fetch ke backend
    }

    isCompiling = true;
    consoleOutput = "> Processing...";
    resetView(); 
    
    try {
      const res = await fetch(`${API_URL}/api/transpile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, userInput: terminalInput }),
      });

      const data = await res.json();

      if (!res.ok) {
          // Tampilkan pesan error di terminal console bawah
          consoleOutput = data.logs || `> Error: ${data.error}`;
          fullAsmCode = "; Compilation Error. Check terminal below.";
          outputEditor.setValue(fullAsmCode);
          isCompiling = false;
          return; 
      }
      fullAsmCode = data.asm || "; No output generated";
      
      // Ambil data sesuai format JSON Backend kamu:
      sourceMap = data.sourceMap || [];     
      headerOffset = data.headerOffset || 0;

      outputEditor.setValue(fullAsmCode);
      consoleOutput = data.logs || "> Compilation successful.";
      
      // Debug awal untuk memastikan data masuk (TETAP DIPERTAHANKAN)
      console.log("DATA LOADED:", { 
        mapLength: sourceMap.length, 
        offset: headerOffset,
        sampleMap: sourceMap.slice(0, 10) // Lihat 10 data pertama
      });

    } catch (e) {
      consoleOutput = `> Network Error: ${e.message}`;
      fullAsmCode = "";
    } finally {
      isCompiling = false;
    }
  }

  function handleCursorChange(clickedLine) {
    console.group(`Debug Click Line: ${clickedLine}`); 

    // 1. Cek Ketersediaan Data
    if (!sourceMap.length || !fullAsmCode) {
      console.warn("Data belum siap!");
      console.groupEnd();
      return;
    }

    // 2. Logika Pencarian Baru (Range Based)
    let startMapIndex = -1;
    let endMapIndex = -1;

    for (let i = 0; i < sourceMap.length; i++) {
      const mapping = sourceMap[i];

      // Skip jika mapping null
      if (!mapping) continue;

      // Cek apakah baris yang diklik ada dalam range mapping ini
      if (clickedLine >= mapping.start && clickedLine <= mapping.end) {
        if (startMapIndex === -1) {
          startMapIndex = i;
        }
        endMapIndex = i;
      }
    }

    console.log("Hasil Pencarian Range:", {
      clickedLine,
      foundStartIndex: startMapIndex,
      foundEndIndex: endMapIndex,
      dataAtStart: sourceMap[startMapIndex] // (TETAP DIPERTAHANKAN)
    });

    // 3. Eksekusi Filter
    if (startMapIndex !== -1 && endMapIndex !== -1) {
      const asmStartLine = startMapIndex + headerOffset;
      const asmEndLine = endMapIndex + headerOffset;

      console.log("MATCH FOUND!", {
        asmStart: asmStartLine,
        asmEnd: asmEndLine
      });

      filterOutput(asmStartLine, asmEndLine);
      highlightInputLine(clickedLine);
      
    } else {
      console.log("NO MATCH: Baris ini tidak menghasilkan assembly (atau di luar range).");
    }
    
    console.groupEnd();
  }

  function filterOutput(startLineIndex, endLineIndex) {
    isFiltered = true;
    const lines = fullAsmCode.split("\n");

    if (startLineIndex >= 0 && startLineIndex < lines.length) {
      const filteredLines = lines.slice(startLineIndex, endLineIndex + 1);
      outputEditor.setValue(filteredLines.join("\n"));
    }
  }

  function highlightInputLine(lineNumber) {
    if (!window.monaco || !inputEditor) return;
    
    // Menggunakan isDark untuk menentukan class decoration
    currentDecorations = inputEditor.deltaDecorations(currentDecorations, [
      {
        range: new window.monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          className: isDark ? 'bg-indigo-500/20' : 'bg-indigo-100',
          linesDecorationsClassName: 'w-1 h-full bg-indigo-500',
          zIndex: 1
        }
      }
    ]);
  }

  function resetView() {
    if (!fullAsmCode) return;
    isFiltered = false;
    outputEditor.setValue(fullAsmCode);
    if (inputEditor) currentDecorations = inputEditor.deltaDecorations(currentDecorations, []);
  }
</script>


<svelte:head>
  <title>Aiko Playground</title>
</svelte:head>


<div class="min-h-screen transition-colors duration-300 {isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-zinc-50 text-zinc-900'} p-4 md:p-8 font-sans">
  <div class="max-w-8xl mx-auto flex flex-col gap-6">
    
    <header class="flex justify-between items-center bg-transparent">
      <div class="flex items-center gap-3">
        <!-- <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">A</div>
        <h1 class="text-xl font-bold tracking-tight">Aiko <span class="opacity-40 font-normal">Playground</span></h1> -->
      </div>

      <div class="flex gap-3">
        <button 
          onclick={run}
          disabled={isCompiling}
          class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20 active:scale-95 flex items-center gap-2"
        >
          {#if isCompiling}
            <div class="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
          {/if}
          {isCompiling ? 'RUNNING...' : 'RUN CODE'}
        </button>
      </div>
    </header>

    <main class="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[700px]">
      
      <div class="flex flex-col rounded-2xl border overflow-hidden shadow-sm {isDark ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-zinc-200'}">
        <div class="px-5 py-3 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50 text-zinc-400' : 'border-zinc-100 bg-zinc-50 text-zinc-500'}">
          <span class="text-[10px] font-black tracking-[0.2em] uppercase">Input (Aiko)</span>
          
          <select 
            onchange={loadExample}
            class="text-sm font-bold bg-transparent border-none focus:ring-0 cursor-pointer outline-none hover:text-indigo-500 transition-colors uppercase tracking-wider"
          >
            <option value="" disabled selected>Load Example</option>
            {#each AIKO_EXAMPLES as example}
              <option value={example.code} class={isDark ? 'bg-zinc-900 text-zinc-300' : 'bg-white text-zinc-600'}>
                {example.name}
              </option>
            {/each}
          </select>
        </div>
        <div bind:this={inputContainer} class="flex-1"></div>
      </div>

      <div class="flex flex-col rounded-2xl border overflow-hidden shadow-sm transition-all duration-300 {isDark ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-zinc-200'} {isFiltered ? 'ring-2 ring-emerald-500/50' : ''}">
        
        <div class="px-5 py-3 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50 text-zinc-400' : 'border-zinc-100 bg-zinc-50 text-zinc-500'}">
          
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-black tracking-[0.2em] uppercase text-emerald-500">Output (Assembly)</span>
            
            {#if isFiltered}
              <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 animate-pulse">
                SYNC VIEW
              </span>
            {/if}
          </div>

          {#if isFiltered}
            <button 
              onclick={resetView}
              class="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-colors
                     {isDark ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-600'}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 12"/><path d="M3 3v9h9"/></svg>
              Show All
            </button>
          {/if}
        </div>
        
        <div bind:this={outputContainer} class="flex-1"></div>
      </div>
    </main>

    <footer class="rounded-2xl border overflow-hidden {isDark ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-zinc-200'}">
      <div class="px-5 py-2 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-100 bg-zinc-50'}">
        <span class="text-[10px] font-black tracking-[0.2em] uppercase opacity-50">Terminal Console</span>
        <span class="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">Interactive Session</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 h-40 font-mono text-sm">
        <div class="p-4 overflow-y-auto {isDark ? 'bg-black/20 text-indigo-300' : 'bg-indigo-50/30 text-indigo-800'} border-r {isDark ? 'border-zinc-800' : 'border-zinc-100'}">
          <pre class="whitespace-pre-wrap">{consoleOutput}</pre>
        </div>
        
        <div class="relative flex flex-col bg-transparent">
          <div class="absolute top-2 right-3 text-[9px] uppercase font-bold opacity-30 pointer-events-none">Standard Input</div>
          <textarea 
            bind:value={terminalInput}
            placeholder="Type inputs here (one per line)..."
            class="w-full h-full p-4 bg-transparent outline-none resize-none {isDark ? 'text-emerald-400 placeholder-zinc-700' : 'text-emerald-600 placeholder-zinc-400'}"
          ></textarea>
        </div>
      </div>
    </footer>

  </div>
</div>

<style>
  /* Fix Monaco container padding */
  :global(.monaco-editor) {
    padding-top: 10px;
    --vscode-editor-background: transparent !important;
  }

  /* Kita bisa hapus style global highlight lama jika tidak dipakai,
     tapi untuk keamanan (jika monacoDefined menggunakannya), kita biarkan. 
     Warna tetap sama dengan kode awal.
  */
  :global(.myInputHighlightDark) {
    background: rgba(99, 102, 241, 0.2); 
    border-radius: 4px;
  }

  :global(.myInputHighlightLight) {
    background: rgba(99, 102, 241, 0.15);
    border-radius: 4px;
  }

  :global(.myGutterDecoration) {
    background: #6366f1;
    width: 4px !important;
    margin-left: 5px;
  }
</style>