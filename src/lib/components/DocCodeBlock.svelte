<script>
    import { getContext } from 'svelte';
    
    let { code, filename = "example.aiko" } = $props();

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    // State untuk animasi tombol
    let isCopied = $state(false);

    // Fungsi Copy
    async function copyToClipboard() {
        try {
            await navigator.clipboard.writeText(code);
            isCopied = true;
            setTimeout(() => isCopied = false, 2000); // Reset setelah 2 detik
        } catch (err) {
            console.error('Gagal copy:', err);
        }
    }

    const highlightedCode = $derived.by(() => {
        // 1. Escape HTML terlebih dahulu (Wajib agar < dan > tidak dianggap tag HTML)
        const safeCode = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // 2. Definisikan Token Regex (Urutan SANGAT PENTING di sini!)
        // Regex akan mencocokkan mana yang ketemu duluan.
        const tokenRegex = new RegExp(
            [
                /(\#.*)/.source,                                           // Group 1: Comments (//...)
                /(".*?")/.source,                                            // Group 2: Strings ("...")
                /(\b\d+\b)/.source,                                          // Group 3: Numbers (10, 99)
                /(\b(?:fun|var|for|in|when|if|else|elif|return|len)\b)/.source,// Group 4: Keywords
                /(\b(?:main|print|print|input)\b)/.source,                       // Group 5: Functions
                /(\b(?:true|false|int|string|bool)\b)/.source,                      // Group 6: Types
            ].join('|'),
            'g'
        );

        // 3. Eksekusi Single Pass Replace
        return safeCode.replace(tokenRegex, (match, comment, string, number, keyword, func, type) => {
            if (comment) return `<span class="text-zinc-500 italic">${match}</span>`;
            if (string)  return `<span class="text-emerald-400">${match}</span>`;
            if (number)  return `<span class="text-orange-400">${match}</span>`;
            if (keyword) return `<span class="text-rose-400 font-bold">${match}</span>`;
            if (func)    return `<span class="text-indigo-400">${match}</span>`;
            if (type)    return `<span class="text-yellow-400">${match}</span>`;
            return match;
        });
    });
</script>
<div class="group not-prose my-8 rounded-xl shadow-2xl overflow-hidden text-left transition-all duration-300 border
    {isDark 
        ? 'bg-[#0f0f12] ring-1 ring-white/10 border-transparent' 
        : 'bg-white ring-1 ring-zinc-200 border-zinc-200 shadow-zinc-200/50'}">
    
    <div class="flex items-center justify-between border-b px-4 py-2 transition-colors
        {isDark ? 'border-white/5 bg-white/5' : 'border-zinc-100 bg-zinc-50/50'}">
        
        <div class="flex gap-2 w-14"> <div class="h-3 w-3 rounded-full bg-[#ff5f56] border border-black/10"></div>
            <div class="h-3 w-3 rounded-full bg-[#ffbd2e] border border-black/10"></div>
            <div class="h-3 w-3 rounded-full bg-[#27c93f] border border-black/10"></div>
        </div>
        
        <span class="text-xs font-medium font-mono transition-colors {isDark ? 'text-zinc-500' : 'text-zinc-400'}">
            {filename}
        </span>

        <div class="w-14 flex justify-end">
            <button 
                onclick={copyToClipboard} 
                class="flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-all
                {isDark 
                    ? 'text-zinc-400 hover:text-white hover:bg-white/10' 
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'}
                {isCopied ? '!text-emerald-500' : ''}"
                aria-label="Copy code"
            >
                {#if isCopied}
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied</span>
                {:else}
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span class="hidden sm:group-hover:inline">Copy</span>
                {/if}
            </button>
        </div>
    </div>

    <div class="p-4 overflow-x-auto relative">
        <pre class="font-mono text-sm leading-relaxed whitespace-pre transition-colors {isDark ? 'text-zinc-300' : 'text-zinc-700'}"><code>{@html highlightedCode}</code></pre>
    </div>
</div>