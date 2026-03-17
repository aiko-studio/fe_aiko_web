<script>
    import { getContext } from 'svelte';
    import DocCodeBlock from '$lib/components/DocCodeBlock.svelte';
    import DocNavigation from '$lib/components/DocNavigation.svelte';

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    let prevStep = { 
        title: "Input", 
        href: "/docs/inputs",
        desc: "Mengambil input dari user." 
    };

    let nextStep = {
        title: "Home", 
        href: "/docs/",
        desc: "Kembali ke halaman awal dokumentasi." 
    };

    // Data Penjelasan Instruksi (Bisa ditambah nanti)
    const instructions = [
        // --- MEMORY & DATA (PONDASI) ---
        {
            op: "MOV",
            desc: "Copy Paste Data",
            detail: "Menyalin data. Ingat: `MOV A, B` artinya salin isi B ke dalam A. Data di B tidak hilang, hanya diduplikat.",
            example: "mov eax, 50   ; eax sekarang bernilai 50\nmov ebx, eax  ; copy nilai eax ke ebx"
        },
        {
            op: "LEA",
            desc: "Ambil Alamat (Address)",
            detail: "Load Effective Address. Bedanya dengan MOV: MOV mengambil 'isi surat' (nilai), LEA hanya mengambil 'alamat rumahnya' (lokasi memori). Penting untuk Pointer.",
            example: "lea eax, [var] ; Ambil alamat memori si 'var', bukan angkanya"
        },
        {
            op: "PUSH / POP",
            desc: "Tumpukan Piring",
            detail: "`PUSH` menaruh data ke atas tumpukan (Stack). `POP` mengambil data paling atas. Dipakai untuk menyimpan variabel sementara agar register bisa dipakai ulang.",
            example: "push eax      ; Simpan isi eax ke tumpukan\npop ebx       ; Ambil data tumpukan, taruh di ebx"
        },

        // --- LOGIC & TRICKS ---
        {
            op: "XOR",
            desc: "Reset jadi Nol",
            detail: "Logika Exclusive OR. Ini adalah trik wajib programmer Assembly untuk mengubah register menjadi 0 karena lebih cepat daripada `MOV EAX, 0`.",
            example: "xor eax, eax  ; eax otomatis jadi 0 (karena angka XOR dirinya sendiri = 0)"
        },
        {
            op: "CMP",
            desc: "Bandingkan (Compare)",
            detail: "Membandingkan dua nilai tanpa mengubah isinya. CPU akan menyalakan 'bendera' (flags) rahasia (Sama/Lebih Besar/Lebih Kecil) untuk dipakai instruksi Jump.",
            example: "cmp eax, 100  ; Cek apakah eax == 100?"
        },
        {
            op: "TEST",
            desc: "Cek Null / Zero",
            detail: "Mirip CMP, tapi biasanya dipakai untuk mengecek apakah sebuah register bernilai 0 atau NULL tanpa membandingkan dengan angka lain.",
            example: "test eax, eax ; Apakah eax kosong (0)?"
        },

        // --- FLOW CONTROL (IF-ELSE & LOOP) ---
        {
            op: "JE / JNE",
            desc: "Lompat Jika Sama/Beda",
            detail: "Jump if Equal / Not Equal. Dieksekusi setelah `CMP`. Inilah cara CPU melakukan `if (a == b)` atau `if (a != b)`.",
            example: "je .sukses    ; Jika CMP tadi hasilnya SAMA, lompat ke label .sukses"
        },
        {
            op: "JG / JL",
            desc: "Lompat Jika Besar/Kecil",
            detail: "Jump if Greater / Less. Digunakan untuk logika matematika seperti `if (a > b)` atau `if (a < b)`.",
            example: "jg .maksimum  ; Jika nilai lebih besar, lompat ke .maksimum"
        },
        {
            op: "JMP",
            desc: "Lompat Paksa (GOTO)",
            detail: "Melompat tanpa syarat apa pun. Sering dipakai di akhir blok `if` atau `loop` untuk melewati kode lain agar tidak dieksekusi.",
            example: "jmp .selesai  ; Langsung loncat ke label selesai"
        },

        // --- SYSTEM & FUNCTION ---
        {
            op: "CALL / RET",
            desc: "Panggil Fungsi",
            detail: "`CALL` melompat ke fungsi lain dan menyimpan jejak pulang. `RET` (Return) membaca jejak tadi untuk kembali ke kode utama.",
            example: "call print    ; Jalankan fungsi print\nret           ; Kembali ke tempat asal"
        },
        {
            op: "INT 0x80",
            desc: "Ketuk Pintu Kernel",
            detail: "Program tidak bisa akses layar/keyboard langsung. `INT 0x80` adalah cara program 32-bit mengetuk pintu OS Linux untuk minta tolong (System Call).",
            example: "mov eax, 4    ; Kode minta 'Print'\nint 0x80      ; 'Halo Linux, kerjakan request saya!'"
        }
    ];

    const codeMapping = `// Aiko Code
var x = 10;
var y = false;`;

    const asmMapping = `; Assembly Output (NASM)
mov [eax], 10    ; Siapkan angka 10
mov [eax + 4], 0 ; Simpan tipe data angka
mov [eax], 0     ; Siapkan boolean false
mov [eax + 4], 2 ; Simpan tipe data boolean`
</script>

<svelte:head>
    <title>Reading Assembly - Aiko Docs</title>
</svelte:head>

<div class="min-h-screen transition-colors duration-300 {isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-white text-zinc-900'}">
    <div class="max-w-4xl mx-auto space-y-12 pb-20 px-6 pt-10">

        <header class="border-b pb-6 transition-colors {isDark ? 'border-zinc-800' : 'border-zinc-200'}">
            <p class="text-rose-500 font-bold tracking-wider uppercase text-xs mb-2">Under the Hood</p>
            <h1 class="text-4xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Reading the Output
            </h1>
            <p class="mt-4 text-lg {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Jangan takut dengan Assembly. Aiko menghasilkan subset instruksi x86-32 yang sederhana. Berikut adalah panduan cepat untuk memahaminya.
            </p>
        </header>

        <section>
            <h2 class="text-2xl font-bold mb-6 {isDark ? 'text-white' : 'text-zinc-900'}">Aiko vs Assembly</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <span class="text-xs font-bold uppercase tracking-wide opacity-50 mb-2 block">Input (Aiko)</span>
                    <DocCodeBlock code={codeMapping} filename="example.aiko" />
                </div>
                
                <div>
                    <span class="text-xs font-bold uppercase tracking-wide opacity-50 mb-2 block">Output (Assembly)</span>
                    <div class="rounded-xl border p-4 font-mono text-sm leading-relaxed overflow-x-auto shadow-2xl transition-all
                        {isDark ? 'bg-[#18181b] border-zinc-700 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'}">
                        <pre>{asmMapping}</pre>
                    </div>
                </div>
            </div>
        </section>

        <section class="space-y-6">
            <h2 class="text-2xl font-bold {isDark ? 'text-white' : 'text-zinc-900'}">Instruction Cheat Sheet</h2>
            <p class="{isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Aiko hanya menggunakan instruksi-instruksi dasar ini untuk 90% kodenya. Hafalkan pola ini, dan Anda bisa membaca output compiler.
            </p>

            <div class="grid grid-cols-1 gap-4">
                {#each instructions as item}
                    <div class="rounded-2xl border p-6 transition-all hover:border-l-4 hover:border-l-rose-500
                        {isDark ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}">
                        
                        <div class="flex flex-col md:flex-row md:items-start gap-4 justify-between">
                            <div>
                                <h3 class="text-xl font-black tracking-tight font-mono text-rose-500">{item.op}</h3>
                                <span class="text-xs font-bold uppercase tracking-wider opacity-50">{item.desc}</span>
                                <p class="mt-2 text-sm leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                                    {item.detail}
                                </p>
                            </div>

                            <div class="w-full md:w-1/2 mt-4 md:mt-0 p-3 rounded-lg font-mono text-xs border
                                {isDark ? 'bg-black/50 border-white/10 text-zinc-400' : 'bg-zinc-100 border-zinc-200 text-zinc-600'}">
                                <pre class="whitespace-pre-wrap">{item.example}</pre>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <DocNavigation 
            prev={prevStep}
            next={nextStep} 
        />

    </div>
</div>