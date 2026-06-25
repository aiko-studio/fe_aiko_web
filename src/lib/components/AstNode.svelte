<script>
  import { getContext } from 'svelte';
  import AstNode from './AstNode.svelte';

  let { node, label = "" } = $props();
  
  const themeCtx = getContext('THEME_CTX');
  const isDark = $derived(themeCtx?.isDark ?? true);

  let expanded = $state(true);

  const isArray = (val) => Array.isArray(val);
  const isObject = (val) => val && typeof val === 'object' && !isArray(val);

  let primitives = $derived(
    isObject(node) 
      ? Object.entries(node).filter(([k, v]) => typeof v !== 'object' && k !== 'type' && !k.toLowerCase().includes('line'))
      : []
  );

  let children = $derived(
    isArray(node)
      ? node.map((child, i) => ({ key: `[${i}]`, value: child }))
      : isObject(node)
        ? Object.entries(node)
            .filter(([k, v]) => typeof v === 'object' && v !== null)
            .map(([k, v]) => ({ key: k, value: v }))
        : []
  );

  function toggle(e) { 
    if (e) {
        e.stopPropagation();
    }
    expanded = !expanded; 
  }

  function getNodeColor(type) {
    if (!type) return isDark ? 'text-zinc-400' : 'text-zinc-500';
    if (type.includes('Decl')) return isDark ? 'text-cyan-400' : 'text-cyan-600';
    if (type.includes('Stmt')) return isDark ? 'text-pink-400' : 'text-pink-600';
    if (type.includes('Op')) return isDark ? 'text-orange-400' : 'text-orange-600';
    if (type === 'Identifier' || type === 'Literal') return isDark ? 'text-emerald-400' : 'text-emerald-600';
    return isDark ? 'text-violet-400' : 'text-violet-600';
  }
</script>

<div class="flex flex-row items-stretch font-mono">
  
  <div class="flex items-center py-2 relative z-10">
    <div class="min-w-[160px] flex flex-col rounded-xl border shadow-sm transition-all hover:shadow-md 
      {isDark ? 'bg-[#1e1e24] border-zinc-700/80' : 'bg-white border-zinc-300'}">
      
      {#snippet headerContent()}
  <div class="flex items-center gap-2">
    {#if children.length > 0}
      <div 
        class="w-5 h-5 rounded flex items-center justify-center transition-colors
               {isDark ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-200 text-zinc-600'}"
        aria-hidden="true"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" 
             class="transition-transform duration-200 {expanded ? 'rotate-90' : ''}">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    {/if}
    
    <span class="text-[11px] font-black tracking-wide {getNodeColor(node?.type)}">
      {node?.type || (isArray(node) ? 'Array/List' : 'Object')}
    </span>
  </div>

  {#if !expanded && children.length > 0}
    <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-full 
      {isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}">
      +{children.length} node
    </span>
  {/if}
{/snippet}

{#if children.length > 0}
  <button 
    type="button"
    class="w-full text-left px-3 py-2 border-b flex justify-between items-center gap-4 rounded-t-xl transition-colors outline-none focus-visible:ring-2 focus-visible:ring-violet-500 cursor-pointer hover:bg-zinc-500/10
           {isDark ? 'border-zinc-700/80 bg-zinc-800/50' : 'border-zinc-200 bg-zinc-50'}" 
    onclick={toggle}
    aria-expanded={expanded}
  >
    {@render headerContent()}
  </button>
{:else}
  <div 
    class="px-3 py-2 border-b flex justify-between items-center gap-4 rounded-t-xl transition-colors
           {isDark ? 'border-zinc-700/80 bg-zinc-800/50' : 'border-zinc-200 bg-zinc-50'}"
  >
    {@render headerContent()}
  </div>
{/if}
    </div>
  </div>

  {#if expanded && children.length > 0}
    <div class="flex items-center">
      <div class="w-6 h-[1.5px] {isDark ? 'bg-zinc-600' : 'bg-zinc-400'}"></div>
    </div>
    
    <div class="flex flex-col justify-center py-2">
      {#each children as child, i}
        {@const isFirst = i === 0}
        {@const isLastChild = i === children.length - 1}
        {@const onlyOne = children.length === 1}
        
        <div class="flex flex-row items-center relative">
          
          {#if !onlyOne}
            <div class="absolute left-0 w-[1.5px] {isDark ? 'bg-zinc-600' : 'bg-zinc-400'}
              {isFirst ? 'top-1/2 bottom-0' : 
               isLastChild ? 'top-0 bottom-1/2' : 
               'top-0 bottom-0'}">
            </div>
          {/if}
          
          <div class="w-14 h-[1.5px] relative flex items-center {isDark ? 'bg-zinc-600' : 'bg-zinc-400'}">
            
            <span class="absolute -top-3.5 left-1.5 text-[9px] font-bold px-1.5 py-[1px] rounded-md z-10 border shadow-sm
              {isDark ? 'bg-[#18181b] border-zinc-700 text-zinc-400' : 'bg-white border-zinc-200 text-zinc-500'}">
              {child.key}
            </span>
            
            <div class="absolute -right-[1px] w-0 h-0 border-y-[4px] border-y-transparent border-l-[6px] 
              {isDark ? 'border-l-zinc-600' : 'border-l-zinc-400'} z-20"></div>
          </div>

          <div class="pl-1">
            <AstNode node={child.value} />
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>