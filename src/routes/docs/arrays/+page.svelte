<script>
    import { getContext } from 'svelte';
    import DocCodeBlock from '$lib/components/DocCodeBlock.svelte';
    import DocNavigation from '$lib/components/DocNavigation.svelte';

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    let prevStep = { 
        title: "Control Flow", 
        href: "/docs/control-flow",
        desc: "Logika percabangan dan perulangan." 
    };

    let nextStep = { 
        title: "Functions", 
        href: "/docs/functions",
        desc: "Membuat kode modular dengan Function." 
    };

    const codeArrayBasic = `# Membuat array statis dengan ukuran 5 (default value otomatis 0)
var data = array(5); 

# Mengisi data ke array
data[0] = 10;
data[1] = 25;

# Print sekarang otomatis menampilkan seluruh isi array
print(data); # Output: [10, 25, 0, 0, 0]`;

    const codeArrayRef = `fun modify(arr) {
    arr[0] = 99; # Mengubah array asli
}

fun main() {
    var myList = array(3);
    myList[0] = 1;
    
    modify(myList);
    print(myList[0]); # Output: 99 (Array bersifat Pass by Reference)
}`;

    const codePushPop = `# Fitur Eksperimental (Alokasi memori dinamis akan diperbarui)
var list = array(2);
push(list, 50);
var lastItem = pop(list);`;
</script>

<svelte:head>
    <title>Arrays - Aiko Documentation</title>
</svelte:head>

<div class="min-h-screen transition-colors duration-300 {isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-white text-zinc-900'}">
    <div class="max-w-4xl mx-auto space-y-10 pb-20 px-6 pt-10">

        <header class="border-b pb-6 transition-colors {isDark ? 'border-zinc-800' : 'border-zinc-200'}">
            <p class="text-rose-500 font-bold tracking-wider uppercase text-xs mb-2">Data Structures</p>
            <h1 class="text-4xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Arrays & Collections
            </h1>
            <p class="mt-4 text-lg {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Mengelola kumpulan data sejenis di dalam memori berturutan menggunakan tipe data Array bawaan Aiko.
            </p>
        </header>

        <article class="prose prose-lg max-w-none transition-colors 
            {isDark ? 'prose-invert prose-p:text-zinc-400 prose-headings:text-zinc-100' : 'prose-zinc'}">
            
            <h3>Static Array Allocation</h3>
            <p>
                Gunakan keyword <code class="text-rose-500 font-bold">array(ukuran)</code> untuk memesan tempat di memori dengan ukuran statis. Secara *default*, compiler Aiko akan mengisi seluruh elemen baru tersebut dengan nilai <code>0</code>.
            </p>

            <div class="not-prose my-6">
                <DocCodeBlock code={codeArrayBasic} filename="arrays.aiko" />
            </div>

            <h3>Array Behavior: Pass by Reference</h3>
            <p>
                Pengecekan array saat ini ditangani langsung oleh <strong>Runtime Engine</strong> Aiko. Saat Anda mengirimkan array ke dalam fungsi, array dikirim sebagai <em>reference</em> (alamat memorinya), bukan diduplikat nilainya. Perubahan di dalam fungsi akan merubah array asli.
            </p>

            <div class="not-prose my-6">
                <DocCodeBlock code={codeArrayRef} filename="array_ref.aiko" />
            </div>

            <div class="my-6 p-4 rounded-xl border border-yellow-500/30 transition-colors {isDark ? 'bg-yellow-500/5' : 'bg-yellow-50'}">
                <h4 class="text-sm font-bold uppercase tracking-wide m-0 mb-1 text-yellow-500">
                    Experimental Features: Push & Pop
                </h4>
                <p class="text-sm m-0 {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                    Aiko menyediakan keyword <code class="font-bold">push</code> dan <code class="font-bold">pop</code> untuk manipulasi elemen. Saat ini implementasi kapasitas memori dinamisnya masih dalam tahap perbaikan, namun struktur parser dan codegen-nya sudah terpasang.
                </p>
                <div class="not-prose mt-3">
                    <DocCodeBlock code={codePushPop} filename="experimental.aiko" />
                </div>
            </div>

        </article>

        <DocNavigation prev={prevStep} next={nextStep} />
    </div>
</div>