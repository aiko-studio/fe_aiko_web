<script>
    import { getContext } from 'svelte';
    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);
</script>

<svelte:head>
    <title>Parser - How Aiko Works</title>
</svelte:head>

<div class="py-20 px-6 min-h-screen relative overflow-hidden">
    <div class="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-rose-500/10 blur-[120px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto relative z-10 space-y-16">
        
        <div class="space-y-6">
            <a href="/mechanism" class="inline-flex items-center gap-2 text-sm font-bold text-rose-500 hover:text-rose-400 transition-colors">
                &larr; Kembali ke Pipeline
            </a>
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Tahap 2: <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-500">Parser</span>
            </h1>
            <p class="text-xl max-w-2xl leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Array token dari Lexer belum memiliki struktur logika. Parser mengambil alih untuk memvalidasi tata bahasa (sintaks) dan merakit token-token tersebut menjadi sebuah pohon hierarki yang disebut <strong class="text-rose-500">Abstract Syntax Tree (AST)</strong>.
            </p>
        </div>

        <div class="rounded-3xl border p-8 md:p-12 {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'} shadow-2xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div class="space-y-6 order-2 lg:order-1">
                    <div class="rounded-2xl overflow-hidden border font-mono text-sm {isDark ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50'}">
                        <div class="px-4 py-2 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-100'}">
                            <span class="text-rose-500 font-bold">AST Representation</span>
                        </div>
                        <div class="p-6 {isDark ? 'text-rose-300' : 'text-rose-700'} overflow-x-auto">
<pre><code>Program
 └── VariableDeclaration
     ├── Identifier (x)
     └── NumericLiteral (100)</code></pre>
                        </div>
                    </div>
                </div>

                <div class="space-y-6 order-1 lg:order-2">
                    <h3 class="text-2xl font-bold {isDark ? 'text-white' : 'text-zinc-900'}">Pendeteksi Error Utama</h3>
                    <p class="leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                        AikoJS menggunakan teknik <em>Recursive Descent Parsing</em>. Jika kamu lupa meletakkan titik koma atau salah mengetik operator, Parser adalah tahap yang akan langsung meneriaki kode kamu dengan pesan error sebelum sempat dieksekusi.
                    </p>
                    <div class="p-4 rounded-xl border-l-4 border-rose-500 {isDark ? 'bg-rose-500/10 text-rose-200' : 'bg-rose-50 text-rose-700'} font-mono text-sm">
                        SyntaxError: Expected ';' after variable declaration at line 1, col 12.
                    </div>
                </div>

            </div>
        </div>

        <div class="flex justify-between items-center">
            <a href="/mechanism/lexer" class="inline-flex items-center gap-2 text-zinc-500 hover:text-rose-500 transition-colors font-bold">
                &larr; Back to Lexer
            </a>
            <a href="/mechanism/codegen" class="inline-flex items-center gap-3 rounded-xl bg-rose-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-rose-500/20 transition-all hover:bg-rose-600 hover:scale-105">
                Lanjut ke Codegen &rarr;
            </a>
        </div>
    </div>
</div>