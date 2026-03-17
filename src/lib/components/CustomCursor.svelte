<script>
    import { onMount } from 'svelte';
    import { getContext } from 'svelte';

    // Ambil tema agar warna kursor menyesuaikan
    const themeCtx = getContext('THEME_CTX');
    const isDark = $derived(themeCtx?.isDark ?? true);

    // Koordinat Mouse (Target)
    let mouseX = $state(0);
    let mouseY = $state(0);

    // Koordinat Lingkaran Luar (Mengikuti dengan delay)
    let ringX = $state(0);
    let ringY = $state(0);

    // Status Hover (Apakah sedang di atas link/tombol?)
    let isHovering = $state(false);
    let isVisible = $state(false);

    onMount(() => {
        // 1. Event Listener Gerakan Mouse
        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (!isVisible) isVisible = true;
            
            // Cek apa yang ada di bawah mouse
            const target = e.target;
            // Jika elemennya link (a), button, atau input
            const isClickable = target.closest('a') || target.closest('button') || target.closest('input') || target.closest('.cursor-hover');
            
            isHovering = !!isClickable;
        };

        const onMouseLeave = () => { isVisible = false; };
        const onMouseEnter = () => { isVisible = true; };

        window.addEventListener('mousemove', onMouseMove);
        document.body.addEventListener('mouseleave', onMouseLeave);
        document.body.addEventListener('mouseenter', onMouseEnter);

        // 2. Animation Loop (Membuat Lingkaran mengikuti dengan delay)
        let frame;
        const animate = () => {
            // Rumus "Lerp" (Linear Interpolation) agar gerakan mulus
            // 0.15 adalah kecepatan (makin kecil makin lambat/berat)
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            
            frame = requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            document.body.removeEventListener('mouseleave', onMouseLeave);
            document.body.removeEventListener('mouseenter', onMouseEnter);
            cancelAnimationFrame(frame);
        };
    });
</script>

<div class="pointer-events-none fixed inset-0 z-[9999] hidden md:block overflow-hidden">
    
    <div 
        class="absolute w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300
        {isDark ? 'bg-rose-500' : 'bg-rose-600'}"
        style="left: {mouseX}px; top: {mouseY}px; opacity: {isVisible ? 1 : 0};"
    ></div>

    <div 
        class="absolute rounded-full -translate-x-1/2 -translate-y-1/2 border transition-all duration-300 ease-out flex items-center justify-center
        {isDark ? 'border-white/30' : 'border-black/20'}"
        style="
            left: {ringX}px; 
            top: {ringY}px; 
            width: {isHovering ? 50 : 24}px; 
            height: {isHovering ? 50 : 24}px;
            opacity: {isVisible ? 1 : 0};
            background-color: {isHovering ? (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)') : 'transparent'};
        "
    >
        <div class="w-1 h-1 bg-current rounded-full opacity-0 transition-opacity duration-300 {isHovering ? 'opacity-100' : ''}"></div>
    </div>

</div>