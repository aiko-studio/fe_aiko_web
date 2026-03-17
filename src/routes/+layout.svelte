<script>
    import '../app.css';
    import favicon from '$lib/assets/favicon.svg';
    import { setContext } from 'svelte';

    import CustomCursor from "$lib/components/CustomCursor.svelte";
    import Navbar from '$lib/components/Navbar.svelte';
    import Footer from "$lib/components/Footer.svelte";
    import LoadingBar from "$lib/components/LoadingBar.svelte";
    import { page } from '$app/stores';

    let { children } = $props();
    export const prerender = true;

    // State Theme
    let themeState = $state({
        isDark: true, // Default
        toggle: () => themeState.isDark = !themeState.isDark
    });

    // Share state ke semua children component
    setContext('THEME_CTX', themeState);
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
    <meta name="description" content="Aiko is a modern systems programming language designed for education. Compile high-level syntax to x86-32 Assembly instantly in your browser." />

    <meta name="keywords" content="Aiko Language, Systems Programming, Assembly, Compiler Design, Learn Programming, SvelteKit, WebAssembly" />

    <meta name="author" content="hammPa" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={$page.url.href} />
    <meta property="og:title" content="Aiko - Learn Assembly Visually" />
    <meta property="og:description" content="Aiko bridges the gap between high-level logic and low-level memory management." />
    <meta property="og:image" content="https://aikoes.dev/og-image.png" /> <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Aiko Language" />
    <meta name="twitter:description" content="The educational systems programming language." />
    <meta name="twitter:image" content="https://aikoes.dev/og-image.png" />
</svelte:head>

<CustomCursor />

<LoadingBar />

<div class="min-h-screen transition-colors duration-300 flex flex-col
    {themeState.isDark ? 'bg-[#0f0f12] text-zinc-100' : 'bg-zinc-50 text-zinc-900'}">

    <Navbar />

    <main class="flex-1">
        {@render children?.()}
    </main>

    <Footer />

</div>