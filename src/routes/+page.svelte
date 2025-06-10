<script lang="ts">
  import type { Project } from '$lib/models/Project';
  import Loading from '$lib/components/Loading.svelte';

  let projects: Project[] = [];
  let loading = true;
  let error: string | null = null;

  async function loadProjects() {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) throw new Error('Failed to load projects');
      projects = await response.json();
    } catch (err) {
      error = 'Failed to load projects';
      console.error(err);
    } finally {
      loading = false;
    }
  }

  $: {
    loadProjects();
  }
</script>

<div class="max-w-7xl mx-auto p-4">
  <h1 class="text-4xl font-bold mb-8 text-center">Support Our Projects</h1>

  {#if loading}
    <Loading />
  {:else if error}
    <div class="alert alert-error">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error}</span>
    </div>
  {:else if projects.length === 0}
    <div class="text-center py-12">
      <h2 class="text-2xl font-semibold mb-4">No projects found. Check back later!</h2>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each projects as project}
        <div class="card bg-base-200 shadow-xl">
          {#if project.imageUrl}
            <figure>
              <img src={project.imageUrl} alt={project.title} class="w-full h-48 object-cover" />
            </figure>
          {/if}
          <div class="card-body">
            <h2 class="card-title">{project.title}</h2>
            <p class="line-clamp-3">{project.description}</p>
            
            <div class="stats shadow my-4">
              <div class="stat">
                <div class="stat-title">Goal</div>
                <div class="stat-value text-primary">${project.goal}</div>
              </div>
              <div class="stat">
                <div class="stat-title">Raised</div>
                <div class="stat-value">${project.amountRaised}</div>
                <div class="stat-desc">
                  {Math.round((project.amountRaised / project.goal) * 100)}% of goal
                </div>
              </div>
            </div>

            <progress 
              class="progress progress-primary w-full" 
              value={project.amountRaised} 
              max={project.goal}
            />

            <div class="card-actions justify-end mt-4">
              <a href="/projects/{project._id}" class="btn btn-primary">
                Donate Now
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* Add custom styles here if needed */
</style>
