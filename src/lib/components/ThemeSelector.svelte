<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';

  const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter'
  ];

  let currentTheme: string;
  theme.subscribe(value => currentTheme = value);

  function setTheme(newTheme: string) {
    theme.set(newTheme);
  }
</script>

<div class="dropdown dropdown-end">
  <div tabindex="0" role="button" class="btn btn-ghost gap-1 normal-case">
    <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-5 w-5 stroke-current">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
    </svg>
    <span class="hidden md:inline">Theme</span>
    <svg width="12px" height="12px" class="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
      <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
    </svg>
  </div>
  <div class="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-[70vh] h-[70vh] w-56 overflow-y-auto shadow-2xl">
    <div class="grid grid-cols-1 gap-3 p-3" role="menu">
      {#each themes as t}
        <button
          class="outline-base-content overflow-hidden rounded-lg text-left"
          class:outline-none={t !== currentTheme}
          class:outline={t === currentTheme}
          data-theme={t}
          on:click={() => setTheme(t)}
          role="menuitem"
        >
          <div class="bg-base-100 text-base-content w-full cursor-pointer font-sans">
            <div class="grid grid-cols-5 grid-rows-3">
              <div class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class:hidden={t !== currentTheme}>
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                </svg>
                <div class="flex-grow text-sm">{t}</div>
                <div class="flex h-full flex-shrink-0 flex-wrap gap-1">
                  <div class="bg-primary w-2 rounded"></div>
                  <div class="bg-secondary w-2 rounded"></div>
                  <div class="bg-accent w-2 rounded"></div>
                  <div class="bg-neutral w-2 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</div> 