<script>
    import { getContext } from 'svelte';
    import DocCodeBlock from '$lib/components/DocCodeBlock.svelte';
    import DocNavigation from '$lib/components/DocNavigation.svelte';

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    let prevStep = { 
        title: "Functions", 
        href: "/docs/functions",
        desc: "Membuat kode modular dengan Function." 
    };

    let nextStep = { 
        title: "Reading Outputs",
        href: "/docs/reading-output",
        desc: "Membaca hasil output low level."
    };

    // Contoh 1: Input Dasar
    const codeBasic = `print("Siapa namamu?");

# Program akan berhenti dan menunggu user mengetik
var name = input(); 

print(name);`;

    // Contoh 2: Input dengan Prompt
    const codePrompt = `# Masukkan pesan prompt langsung ke dalam input()
var hobby = input("Apa hobi kamu? ");

print(hobby);`;

    const codeCasting = `# Gunakan keyword 'as' untuk mengubah tipe data
var age = input("Masukkan umur kamu: ") as int;

# Sekarang 'age' adalah angka, bisa dijumlahkan
var nextYear = age + 1;

print(nextYear);`;
</script>

<svelte:head>
    <title>Input - Aiko Documentation</title>
</svelte:head>

<div class="min-h-screen transition-colors duration-300 {isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-white text-zinc-900'}">
    <div class="max-w-4xl mx-auto space-y-10 pb-20 px-6 pt-10">

        <header class="border-b pb-6 transition-colors {isDark ? 'border-zinc-800' : 'border-zinc-200'}">
            <p class="text-rose-500 font-bold tracking-wider uppercase text-xs mb-2">Interaction</p>
            <h1 class="text-4xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                User Input
            </h1>
            <p class="mt-4 text-lg {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Membuat program interaktif dengan membaca data yang diketikkan pengguna melalui terminal (Standard Input).
            </p>
        </header>

        <article class="prose prose-lg max-w-none transition-colors 
            {isDark ? 'prose-invert prose-p:text-zinc-400 prose-headings:text-zinc-100' : 'prose-zinc'}">
            
            <h3>Basic Input</h3>
            <p>
                Gunakan fungsi bawaan <code class="text-indigo-400 font-bold">input()</code> untuk membaca satu baris teks dari terminal. Fungsi ini akan mengembalikan data bertipe <code class="text-yellow-400 font-bold">String</code>.
            </p>
            <p>
                Saat program mencapai baris <code>input()</code>, eksekusi akan jeda (pause) sampai pengguna menekan tombol <strong>Enter</strong>.
            </p>

            <div class="not-prose my-6">
                <DocCodeBlock code={codeBasic} filename="input_test.aiko" />
                
                <div class="mt-2 rounded-xl border p-4 font-mono text-xs transition-colors
                    {isDark ? 'bg-black/30 border-white/10' : 'bg-zinc-50 border-zinc-200'}">
                    <div class="text-zinc-500 mb-2">Terminal Output:</div>
                    <div>Siapa namamu?</div>
                    <div class="text-white">Aiko User<span class="animate-pulse">_</span></div>
                    <div class="text-emerald-500 mt-1">Aiko User</div>
                </div>
            </div>

            <h3>Input with Prompt</h3>
            <p>
                Agar kode lebih ringkas, Anda bisa mengirimkan pesan string langsung ke dalam kurung <code>input("Pesan...")</code>. Pesan ini akan dicetak ke layar sebelum menunggu input.
            </p>

            <div class="not-prose my-6">
                <DocCodeBlock code={codePrompt} filename="prompt.aiko" />
                <div class="mt-2 rounded-xl border p-4 font-mono text-xs transition-colors
                    {isDark ? 'bg-black/30 border-white/10' : 'bg-zinc-50 border-zinc-200'}">
                    <div class="text-zinc-500 mb-2">Terminal Output:</div>
                    <div>Apa hobi kamu? Aiko User<span class="animate-pulse">_</span></div>
                    <div class="text-emerald-500 mt-1">Aiko User</div>
                </div>
            </div>

            <h3>Type Parsing</h3>
            <p>
                Karena <code>input()</code> selalu mengembalikan <strong>String</strong>, Anda tidak bisa langsung melakukan operasi matematika padanya. 
                Gunakan keyword <code class="text-rose-500 font-bold">as</code> untuk mengubahnya menjadi tipe data lain, seperti <code class="text-yellow-400 font-bold">Int</code>.
            </p>

            <div class="not-prose my-6">
                <DocCodeBlock code={codeCasting} filename="type_cast.aiko" />
                
                <div class="mt-2 rounded-xl border p-4 font-mono text-xs transition-colors
                    {isDark ? 'bg-black/30 border-white/10' : 'bg-zinc-50 border-zinc-200'}">
                    <div class="text-zinc-500 mb-2">Terminal Output:</div>
                    <div>Masukkan umur kamu: <span class="text-white">20</span></div>
                    <div class="text-emerald-500 mt-1">21</div>
                </div>
            </div>

            <div class="my-6 p-4 rounded-xl border-l-4 border-rose-500 transition-colors {isDark ? 'bg-rose-500/10' : 'bg-rose-50'}">
                <h4 class="text-sm font-bold uppercase tracking-wide m-0 mb-1 {isDark ? 'text-rose-500' : 'text-rose-800'}">
                    Runtime Safety
                </h4>
                <p class="text-sm m-0 {isDark ? 'text-rose-200/80' : 'text-rose-800/80'}">
                    Jika user memasukkan teks yang bukan angka (misal: "dua puluh") saat diminta <code>as Int</code>, program akan berhenti dengan pesan error (Panic). Pastikan input valid!
                </p>
            </div>

        </article>

        <DocNavigation 
            prev={prevStep}
            next={nextStep}
        />
    </div>
</div>