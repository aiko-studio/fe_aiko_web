<script>
    import { page } from '$app/stores';
    import { getContext } from 'svelte';

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);
</script>

<svelte:head>
    <title>Halaman Tidak Ditemukan</title>
</svelte:head>

<div class="grid min-h-screen place-items-center px-6 transition-colors duration-300 relative overflow-hidden
    {isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-white text-zinc-900'}">

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none
        {isDark ? 'bg-rose-900/40' : 'bg-rose-100'}"></div>

    <div class="relative z-10 text-center max-w-xl mx-auto space-y-8">
        
        <h1 class="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b 
            {isDark ? 'from-white to-zinc-800' : 'from-zinc-900 to-zinc-200'}">
            404
        </h1>

        <div class="space-y-2">
            <h2 class="text-2xl md:text-3xl font-bold">Halaman Hilang</h2>
            <p class="text-lg {isDark ? 'text-zinc-400' : 'text-zinc-500'}">
                Sepertinya Anda tersesat di tempat yang belum kami bangun.
            </p>
        </div>

        <div class="mx-auto max-w-md transform transition-all hover:scale-105">
            <div class="rounded-xl border p-6 text-center shadow-2xl backdrop-blur-sm
                {isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white/50 border-zinc-200'}">
                
                <div class="flex gap-2 mb-6 justify-center opacity-30">
                    <div class="h-2 w-2 rounded-full bg-zinc-500"></div>
                    <div class="h-2 w-2 rounded-full bg-zinc-500"></div>
                    <div class="h-2 w-2 rounded-full bg-zinc-500"></div>
                </div>

                <div class="flex flex-col items-center gap-3 font-mono text-sm">
                    <div class="flex items-center gap-2 opacity-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                        <span>website / pages /</span>
                    </div>
                    
                    <div class="flex items-center gap-2 text-rose-500 bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span class="font-bold truncate max-w-[200px]">{$page.url.pathname}</span>
                        <span>(Tidak Ditemukan)</span>
                    </div>
                </div>

            </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="/" class="h-12 px-8 rounded-full bg-rose-600 text-white font-bold flex items-center justify-center shadow-lg shadow-rose-600/20 hover:bg-rose-700 hover:scale-105 transition-all w-full sm:w-auto">
                Kembali ke Home
            </a>
            <a href="/docs" class="h-12 px-8 rounded-full border font-bold flex items-center justify-center transition-all w-full sm:w-auto
                {isDark ? 'border-zinc-700 hover:bg-zinc-800' : 'border-zinc-200 hover:bg-zinc-50'}">
                Baca Dokumentasi
            </a>
        </div>

    </div>
</div>