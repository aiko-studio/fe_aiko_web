<script>
    import { navigating } from '$app/stores';
    import { fade } from 'svelte/transition';
</script>

{#if $navigating}
    <div 
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        transition:fade={{ duration: 150 }}
    >
        <div class="relative h-12 w-12">
            <div class="absolute inset-0 rounded-full border-4 border-zinc-600 opacity-20"></div>
            <div class="absolute inset-0 rounded-full border-4 border-t-rose-600 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        </div>
    </div>
{/if}