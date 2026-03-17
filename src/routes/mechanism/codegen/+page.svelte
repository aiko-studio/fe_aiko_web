<script>
    import { getContext } from 'svelte';
    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);
</script>

<svelte:head>
    <title>Code Generator - How Aiko Works</title>
</svelte:head>

<div class="py-20 px-6 min-h-screen relative overflow-hidden flex flex-col justify-center">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto w-full relative z-10 space-y-16">
        
        <div class="space-y-6">
            <a href="/mechanism/parser" class="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
                &larr; Kembali ke Parser
            </a>
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Tahap 3: <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Codegen</span>
            </h1>
            <p class="text-xl max-w-2xl leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Di sinilah keajaiban sesungguhnya terjadi. Code Generator mengambil struktur AST dan menerjemahkannya secara langsung menjadi instruksi <strong class="text-blue-500">NASM x32 (Assembly bare-metal)</strong>. Tanpa interpreter, tanpa mesin virtual di tengah-tengah.
            </p>
        </div>

        <div class="rounded-3xl border p-8 md:p-12 {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'} shadow-2xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold {isDark ? 'text-white' : 'text-zinc-900'}">Dari Pohon ke Mesin</h3>
                    <p class="leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                        Aiko tidak dikompilasi ke bytecode perantara. Setiap node dari AST dipetakan langsung ke instruksi memori dan register CPU arsitektur 32-bit. 
                    </p>
                    <ul class="space-y-3 {isDark ? 'text-zinc-300' : 'text-zinc-700'}">
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                            Manajemen Register (EAX, EBX, ECX)
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                            Alokasi Stack Frame (EBP, ESP)
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                            Resolusi System Call langsung
                        </li>
                    </ul>
                </div>

                <div class="rounded-2xl overflow-hidden border font-mono text-sm {isDark ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50'}">
                    <div class="px-4 py-2 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-100'}">
                        <span class="text-rose-500 font-bold">Input (AST Node)</span>
                    </div>
                    <div class="p-6 {isDark ? 'text-zinc-300' : 'text-zinc-700'}">
                        <span class="text-rose-400">let</span> x = <span class="text-emerald-400">100</span>;
                    </div>
                    
                    <div class="px-4 py-2 border-y flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-100'}">
                        <span class="text-blue-500 font-bold">Output (NASM x32)</span>
                    </div>
                    <div class="p-6 {isDark ? 'text-blue-400' : 'text-blue-700'} overflow-x-auto">
<pre><code>; Deklarasi variabel 'x' ke stack
sub esp, 4
mov eax, 100
mov dword [ebp-4], eax</code></pre>
                    </div>
                </div>

            </div>
        </div>

        <div class="flex justify-between items-center">
            <a href="/mechanism/parser" class="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors font-bold">
                &larr; Back to Parser
            </a>
            <a href="/mechanism/memory-box" class="inline-flex items-center gap-3 rounded-xl bg-blue-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-600 hover:scale-105">
                Lanjut ke Memory Model &rarr;
            </a>
        </div>
    </div>
</div>