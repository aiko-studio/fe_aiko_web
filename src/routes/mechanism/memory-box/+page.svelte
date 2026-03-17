<script>
    import { getContext } from 'svelte';
    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);
</script>

<svelte:head>
    <title>Memory Model - How Aiko Works</title>
</svelte:head>

<div class="py-20 px-6 min-h-screen relative overflow-hidden flex flex-col justify-center">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto w-full relative z-10 space-y-16">
        
        <div class="space-y-6">
            <a href="/mechanism/codegen" class="inline-flex items-center gap-2 text-sm font-bold text-orange-500 hover:text-orange-400 transition-colors">
                &larr; Kembali ke Codegen
            </a>
            <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Memory: <span class="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Boxed Heap</span>
            </h1>
            <p class="text-xl max-w-2xl leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Sebagai bahasa dinamis yang dicompile ke Assembly, Aiko tidak menggunakan Garbage Collector yang berat. Data dinamis dibungkus ke dalam mekanisme <strong class="text-orange-500">Memory Box</strong> untuk membedakan pointer dengan tipe data primitif secara runtime.
            </p>
        </div>

        <div class="rounded-3xl border p-8 md:p-12 {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'} shadow-2xl">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                <div class="space-y-6 order-2 lg:order-1">
                    <div class="rounded-2xl overflow-hidden border font-mono text-sm {isDark ? 'border-zinc-800 bg-[#09090b]' : 'border-zinc-200 bg-zinc-50'}">
                        <div class="px-4 py-2 border-b flex justify-between items-center {isDark ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-zinc-100'}">
                            <span class="text-orange-500 font-bold">Struktur Box di Memori (C-like)</span>
                        </div>
                        <div class="p-6 {isDark ? 'text-orange-300' : 'text-orange-700'} overflow-x-auto">
<pre><code>struct AikoBox &#123;
    uint8_t type_tag;  // 1 byte: String, Array, dll
    uint8_t is_marked; // 1 byte: untuk manajemen
    uint32_t size;     // 4 bytes: panjang data
    void* payload;     // 4 bytes: pointer data (x32)
&#125;</code></pre>
                        </div>
                    </div>
                </div>

                <div class="space-y-6 order-1 lg:order-2">
                    <h3 class="text-2xl font-bold {isDark ? 'text-white' : 'text-zinc-900'}">Mengapa Boxed?</h3>
                    <p class="leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                        Pada arsitektur 32-bit murni tanpa mesin virtual (seperti V8 pada JS), variabel hanya berupa kumpulan bit. Aiko menggunakan "Box" agar saat runtime, memori tau bahwa pointer `0x00A1` adalah sebuah String, bukan Number murni.
                    </p>
                    <ul class="space-y-3 {isDark ? 'text-zinc-300' : 'text-zinc-700'}">
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                            Stack untuk Number / Primitif (Cepat)
                        </li>
                        <li class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-orange-500"></div>
                            Heap Box untuk String / Array / Closure
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <div class="flex justify-between items-center">
            <a href="/mechanism/codegen" class="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-500 transition-colors font-bold">
                &larr; Back to Codegen
            </a>
            <a href="/mechanism" class="inline-flex items-center gap-3 rounded-xl bg-zinc-800 px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-zinc-700 hover:scale-105">
                Selesai &amp; Kembali ke Menu &rarr;
            </a>
        </div>
    </div>
</div>