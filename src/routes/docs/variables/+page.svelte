<script>
    import { getContext } from 'svelte';
    import DocCodeBlock from '$lib/components/DocCodeBlock.svelte';
    import DocNavigation from '$lib/components/DocNavigation.svelte';

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    // Navigasi
    let prevStep = {
        title: "Home Flow",
        href: "/docs/",
        desc: "Kembali ke halaman awal dokumentasi."
    };

    let nextStep = {
        title: "Control Flow",
        href: "/docs/control-flow",
        desc: "Pelajari If-Else dan Loops di Aiko."
    };

    // Code Examples
    const codeBasic = `# Type Inference (Otomatis mendeteksi tipe)
var age = 25;
var name = "Aiko";

var isActive = true; # Terdeteksi sebagai bool`;

    const codeConst = `# Variable Mutable (Bisa diubah)
var score = 100;
score = 200; # OK

# Immutable (Konstan)
val PI = 3.14;
PI = 3.53; # ERROR`;
</script>

<svelte:head>
    <title>Variables - Aiko Documentation</title>
</svelte:head>

<div class="min-h-screen transition-colors duration-300 {isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-white text-zinc-900'}">
    <div class="max-w-4xl mx-auto space-y-10 pb-20 px-6 pt-10">

        <header class="border-b pb-6 transition-colors {isDark ? 'border-zinc-800' : 'border-zinc-200'}">
            <p class="text-rose-500 font-bold tracking-wider uppercase text-xs mb-2">Fundamentals</p>
            <h1 class="text-4xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Variables & Data Types
            </h1>
            <p class="mt-4 text-lg {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Aiko menggunakan sistem <strong>dynamic typing</strong>.
            </p>
        </header>

        <article class="prose prose-lg max-w-none transition-colors 
            {isDark ? 'prose-invert prose-p:text-zinc-400 prose-headings:text-zinc-100' : 'prose-zinc'}">
            
            <h3>Declaration</h3>
            <p>
                Gunakan keyword <code class="text-rose-500 font-bold">var</code> untuk mendeklarasikan variabel baru. Tipe datanya akan secara otomatis dideteksi oleh compiler Aiko.
            </p>

            <div class="not-prose my-6">
                <DocCodeBlock code={codeBasic} filename="variables.aiko" />
            </div>

            <h3>Primitive Types</h3>
            <p>Saat ini Aiko mendukung tipe data primitif berikut:</p>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                <li class="p-4 rounded-xl border {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}">
                    <span class="font-bold text-yellow-400">Int</span>
                    <p class="text-sm mt-1 opacity-70">Bilangan bulat 64-bit signed.</p>
                </li>
                <li class="p-4 rounded-xl border {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}">
                    <span class="font-bold text-yellow-400">String</span>
                    <p class="text-sm mt-1 opacity-70">Teks UTF-8.</p>
                </li>
                <li class="p-4 rounded-xl border {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}">
                    <span class="font-bold text-yellow-400">bool</span>
                    <p class="text-sm mt-1 opacity-70">Nilai boolean true atau false.</p>
                </li>
                <li class="p-4 rounded-xl border {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}">
                    <span class="font-bold text-yellow-400">Array</span>
                    <p class="text-sm mt-1 opacity-70">Koleksi struktur data dengan referensi alamat memori.</p>
                </li>
                <li class="p-4 rounded-xl border {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}">
                    <span class="font-bold text-rose-400">Null (Type ID: 9)</span>
                    <p class="text-sm mt-1 opacity-70">Keyword primitif penanda nilai kosong atau tidak terisi.</p>
                </li>
            </ul>

            <h3>Mutability & Constants</h3>
            <p>
                Variabel <code class="text-rose-500 font-bold">var</code> bersifat <em>mutable</em> (nilainya dapat diubah kembali). Parser juga aman menangani skenario pembaruan mandiri seperti <code>x = x + 1</code>.
            </p>
            <p>
                Untuk membuat penanda nilai bersifat konstan dan aman dari proses penulisan ulang memori, gunakan keyword <code class="text-rose-500 font-bold">val</code>.
            </p>
            <div class="not-prose my-6">
                <DocCodeBlock code={codeConst} filename="mutability.aiko" />
            </div>

        </article>

    <DocNavigation
        prev={prevStep}
        next={nextStep}
    />
    
    </div>
</div>