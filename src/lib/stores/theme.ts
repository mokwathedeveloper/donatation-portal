import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const defaultTheme = 'light';

function createThemeStore() {
  const { subscribe, set } = writable(defaultTheme);

  return {
    subscribe,
    set: (value: string) => {
      if (browser) {
        document.documentElement.setAttribute('data-theme', value);
        localStorage.setItem('theme', value);
      }
      set(value);
    },
    toggle: () => {
      if (browser) {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        set(next);
      }
    }
  };
}

export const theme = createThemeStore(); 