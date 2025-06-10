<script lang="ts">
  import '../app.css';
  import ThemeSelector from '$lib/components/ThemeSelector.svelte';
  import { onMount } from 'svelte';
  import { theme } from '$lib/stores/theme';

  onMount(() => {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      theme.set(savedTheme);
    }
  });
</script>

<div class="min-h-screen bg-base-100">
  <header class="navbar bg-base-200">
    <div class="navbar-start">
      <a href="/" class="btn btn-ghost normal-case text-xl">Donation Platform</a>
    </div>
    <div class="flex-none gap-2">
      <ThemeSelector />
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="User avatar" src="https://ui-avatars.com/api/?name=Admin" />
          </div>
        </div>
        <ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
          <li><a href="/admin">Admin Dashboard</a></li>
          <li><a href="/admin/settings">Settings</a></li>
        </ul>
      </div>
    </div>
  </header>

  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>

  <footer class="footer footer-center p-4 bg-base-200 text-base-content">
    <div>
      <p>© 2024 - All rights reserved</p>
    </div>
  </footer>
</div>

<style>
  :global(html) {
    background-color: hsl(var(--b1));
  }
</style>
