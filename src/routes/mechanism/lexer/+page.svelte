<script>
    import { getContext } from 'svelte';
    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);
</script>

<svelte:head>
    <title>Lexer - How Aiko Works</title>
</svelte:head>

<div class="py-20 px-6 min-h-screen relative overflow-hidden">
    <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto relative z-10 space-y-16">
        
        <div class="space-y-6">
            <a href="/mechanism" class="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors">
                &larr; Kembali ke Pipeline
            </a>
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Tahap 1: <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Lexer</span>
            </h1>
            <p class="text-xl max-w-2xl leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Lexer (atau Scanner) adalah mata dari AikoJS. Tugasnya sederhana: membaca kode sumber karakter demi karakter, membuang spasi atau komentar, dan mengelompokkannya menjadi bagian-bagian yang bermakna yang disebut <strong class="text-emerald-500">Token</strong>.
            </p>
        </div>

        <div class="rounded-3xl border p-8 md:p-12 {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'} shadow-2xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold {isDark ? 'text-white' : 'text-zinc-900'}">Dari Teks ke Array</h3>
                    <p class="leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                        Komputer tidak mengerti apa itu "let" atau "x". Lexer menerjemahkan teks mentah menjadi objek terstruktur. Setiap token menyimpan tipe (misal: Keyword, Identifier, Number) dan nilai aslinya.
                    </p>
                    <ul class="space-y-3 {isDark ? 'text-zinc-300' : 'text-zinc-700'}">
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                            Mengenali Keyword (let, fn, if)
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                            Mengabaikan Whitespace & Komentar
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                            Validasi karakter ilegal awal
                        </li>
                    </ul>
                </div>

                <div class="rounded-2xl overflow-hidden border font-mono text-sm {isDark ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50'}">
                    <div class="px-4 py-2 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-100'}">
                        <span class="text-emerald-500 font-bold">Source.aiko</span>
                    </div>
                    <div class="p-6 {isDark ? 'text-zinc-300' : 'text-zinc-700'}">
                        <span class="text-rose-400">let</span> x = <span class="text-blue-400">100</span>;
                    </div>
                    
                    <div class="px-4 py-2 border-y flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-100'}">
                        <span class="text-teal-500 font-bold">Output Tokens (JSON)</span>
                    </div>
                    <div class="p-6 {isDark ? 'text-emerald-400' : 'text-teal-700'} overflow-x-auto">
<pre><code>[
  &#123; type: "KEYWORD", value: "let" &#125;,
  &#123; type: "IDENTIFIER", value: "x" &#125;,
  &#123; type: "ASSIGN", value: "=" &#125;,
  &#123; type: "NUMBER", value: "100" &#125;,
  &#123; type: "SEMICOLON", value: ";" &#125;,
  &#123; type: "EOF", value: "" &#125;
]</code></pre>
                    </div>
                </div>

            </div>
        </div>

        <div class="flex justify-end">
            <a href="/mechanism/parser" class="inline-flex items-center gap-3 rounded-xl bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 hover:scale-105">
                Lanjut ke Parser &rarr;
            </a>
        </div>
    </div>
</div>