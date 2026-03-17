<script>
    import { getContext } from 'svelte';
    
    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    const menuItems = [
        {
            title: "1. Lexer (Scanner)",
            subtitle: "Source to Tokens",
            desc: "Bagaimana AikoJS membaca karakter demi karakter dan memecahnya menjadi token yang bermakna.",
            link: "/mechanism/lexer",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            glowVar: "16, 185, 129", // Emerald
            icon: "M7 8h10M7 12h10M4 16h1k M4 4h16v16H4z"
        },
        {
            title: "2. Parser",
            subtitle: "Tokens to AST",
            desc: "Proses merakit array token menjadi Abstract Syntax Tree (AST) dan validasi sintaks.",
            link: "/mechanism/parser",
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            glowVar: "244, 63, 94", // Rose
            icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        },
        {
            title: "3. Code Generator",
            subtitle: "AST to NASM x32",
            desc: "Mesin utama yang menerjemahkan AST secara langsung menjadi instruksi Assembly bare-metal.",
            link: "/mechanism/codegen",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            glowVar: "59, 130, 246", // Blue
            icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        },
        {
            title: "Memory Model",
            subtitle: "Stack & Boxed Heap",
            desc: "Pelajari arsitektur manajemen memori manual Aiko tanpa menggunakan Garbage Collector.",
            link: "/mechanism/memory-box",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            glowVar: "249, 115, 22", // Orange
            icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        }
    ];
</script>

<svelte:head>
    <title>How It Works - Aiko Language</title>
</svelte:head>

<div class="py-24 px-6 min-h-screen flex flex-col justify-center relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-500/5 blur-[120px] pointer-events-none"></div>

    <div class="max-w-5xl mx-auto w-full relative z-10 space-y-16">
        
        <div class="text-center space-y-4">
            <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight {isDark ? 'text-white' : 'text-zinc-900'}">
                Under the <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Hood</span>
            </h1>
            <p class="text-lg {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                Pilih tahapan kompilasi di bawah ini untuk melihat bagaimana AikoJS bekerja.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each menuItems as item, index}
                <div class="float-wrapper" style="animation-delay: {index * 0.3}s;">
                    
                    <a href={item.link} 
                       style="--glow-rgb: {item.glowVar};"
                       class="card-inner group block p-8 rounded-3xl border 
                        {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200'}">
                        
                        <div class="flex items-start gap-6">
                            
                            <div class="icon-wrapper flex-shrink-0" style="animation-delay: {index * 0.3}s;">
                                <div class="icon-inner w-14 h-14 rounded-2xl flex items-center justify-center {item.bg} {item.color}">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d={item.icon} />
                                    </svg>
                                </div>
                            </div>

                            <div class="space-y-2 flex-1">
                                <div class="text-xs font-bold uppercase tracking-wider {item.color}">
                                    {item.subtitle}
                                </div>
                                <h2 class="text-2xl font-bold transition-colors duration-500 group-hover:{item.color} {isDark ? 'text-white' : 'text-zinc-900'}">
                                    {item.title}
                                </h2>
                                <p class="text-sm leading-relaxed {isDark ? 'text-zinc-400' : 'text-zinc-500'}">
                                    {item.desc}
                                </p>
                            </div>

                            <div class="arrow-inner flex-shrink-0 text-zinc-500 {item.color}">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                        </div>
                    </a>
                </div>
            {/each}
        </div>

    </div>
</div>

<style>
    /* ==========================================
       1. ANIMASI MENGAMBANG DEFAULT (Pada Wrapper)
       ========================================== */
    @keyframes continuous-float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-8px); }
    }
    
    .float-wrapper {
        /* Animasi berjalan abadi, tidak diinterupsi oleh hover */
        animation: continuous-float 4s ease-in-out infinite;
        will-change: transform;
    }

    @keyframes continuous-pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }

    .icon-wrapper {
        animation: continuous-pulse 4s ease-in-out infinite;
    }

    /* ==========================================
       2. TRANSISI HOVER HALUS (Pada Kartu)
       ========================================== */
    .card-inner {
        /* Menggunakan cubic-bezier untuk efek perlambatan yang natural di akhir transisi */
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        box-shadow: 0 5px 15px rgba(var(--glow-rgb), 0.05);
        border-color: rgba(var(--glow-rgb), 0.1);
        position: relative;
        z-index: 1;
    }

    /* Efek saat kartu di-hover */
    .card-inner:hover {
        transform: scale(1.02) translateY(-4px);
        box-shadow: 0 20px 40px -10px rgba(var(--glow-rgb), 0.4);
        border-color: rgba(var(--glow-rgb), 0.5);
        background-color: rgba(var(--glow-rgb), 0.03);
        z-index: 10;
    }

    /* ==========================================
       3. TRANSISI ELEMEN DALAM SAAT HOVER
       ========================================== */
    .icon-inner {
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .card-inner:hover .icon-inner {
        transform: scale(1.15) rotate(6deg);
    }

    /* Panah meluncur dari kiri dengan halus */
    .arrow-inner {
        opacity: 0;
        transform: translateX(-15px);
        transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .card-inner:hover .arrow-inner {
        opacity: 1;
        transform: translateX(0px);
    }
</style>