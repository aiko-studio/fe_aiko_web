<script>
    import { getContext } from 'svelte';

    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    const currentYear = new Date().getFullYear();
</script>

<footer class="border-t py-12 px-6 transition-colors duration-300
    {isDark ? 'bg-[#0f0f12] border-zinc-800' : 'bg-zinc-50 border-zinc-200'}">
    
    <div class="max-w-6xl mx-auto">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            <div class="md:col-span-2 space-y-4">
                <div class="flex items-center gap-2 font-bold text-xl">
                    <div class="h-8 w-8 rounded-lg bg-rose-600 flex items-center justify-center text-white text-sm">A</div>
                    <span class="{isDark ? 'text-white' : 'text-zinc-900'}">
                        Aiko <span class="text-rose-600">Language</span>
                    </span>
                </div>
                <p class="text-sm leading-relaxed max-w-sm {isDark ? 'text-zinc-500' : 'text-zinc-600'}">
                    Bahasa pemrograman edukasi untuk menjembatani logika High-Level dengan instruksi mesin Low-Level.
                </p>
            </div>

            <div>
                <h4 class="font-bold mb-4 text-sm uppercase tracking-wider {isDark ? 'text-zinc-100' : 'text-zinc-900'}">
                    Resources
                </h4>
                <ul class="space-y-3 text-sm {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                    <li><a href="/docs" class="hover:text-rose-500 transition-colors">Documentation</a></li>
                    <li><a href="/docs/variables" class="hover:text-rose-500 transition-colors">Quick Start</a></li>
                    <li><a href="/" class="hover:text-rose-500 transition-colors">Playground</a></li>
                    <li><a href="/docs/reading-output" class="hover:text-rose-500 transition-colors">Assembly Cheat Sheet</a></li>
                </ul>
            </div>

            <div>
                <h4 class="font-bold mb-4 text-sm uppercase tracking-wider {isDark ? 'text-zinc-100' : 'text-zinc-900'}">
                    Project
                </h4>
                <ul class="space-y-3 text-sm {isDark ? 'text-zinc-400' : 'text-zinc-600'}">
                    <li><a href="/about" class="hover:text-rose-500 transition-colors">About & Philosophy</a></li>
                    <li><a href="https://github.com/hammPa/aiko_js" target="_blank" class="hover:text-rose-500 transition-colors">GitHub Repository</a></li>
                    <li>
                        <span class="flex items-center gap-2">
                            Status: 
                            <span class="flex items-center gap-1.5 text-emerald-500 font-medium">
                                <span class="relative flex h-2 w-2">
                                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Alpha v0.1
                            </span>
                        </span>
                    </li>
                </ul>
            </div>

        </div>

        <div class="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs
            {isDark ? 'border-zinc-800 text-zinc-600' : 'border-zinc-200 text-zinc-500'}">
            
            <p>&copy; {currentYear} Aiko Language Project. Open Source (MIT).</p>
            
            <div class="flex gap-6">
                <a href="#" class="hover:text-rose-500 transition-colors">Privacy</a>
                <a href="#" class="hover:text-rose-500 transition-colors">Terms</a>
                <a href="#" class="hover:text-rose-500 transition-colors">Sitemap</a>
            </div>
        </div>

    </div>
</footer>