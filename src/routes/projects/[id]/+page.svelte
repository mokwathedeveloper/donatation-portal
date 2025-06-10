<script lang="ts">
  import { page } from '$app/stores';
  import type { Project } from '$lib/models/Project';
  import Loading from '$lib/components/Loading.svelte';

  let project: Project | null = null;
  let loading = true;
  let donationAmount = '';
  let phoneNumber = '';
  let submitting = false;
  let error: string | null = null;
  let success: string | null = null;

  async function loadProject() {
    try {
      const response = await fetch(`/api/projects/${$page.params.id}`);
      if (!response.ok) throw new Error('Project not found');
      project = await response.json();
    } catch (err) {
      error = 'Failed to load project';
      console.error(err);
    } finally {
      loading = false;
    }
  }

  async function handleDonation(e: SubmitEvent) {
    e.preventDefault();
    if (!project) return;

    error = null;
    success = null;
    submitting = true;

    try {
      // Validate input
      if (!donationAmount || isNaN(Number(donationAmount)) || Number(donationAmount) <= 0) {
        throw new Error('Please enter a valid donation amount');
      }
      if (!phoneNumber || !/^\+?[0-9]{10,12}$/.test(phoneNumber)) {
        throw new Error('Please enter a valid phone number');
      }

      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: project._id,
          amount: Number(donationAmount),
          phoneNumber: phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to process donation');
      }

      success = 'Thank you for your donation! You will receive an M-Pesa prompt shortly.';
      donationAmount = '';
      phoneNumber = '';
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to process donation';
      console.error(err);
    } finally {
      submitting = false;
    }
  }

  $: {
    loadProject();
  }
</script>

{#if loading}
  <Loading />
{:else if error}
  <div class="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{error}</span>
  </div>
{:else if project}
  <div class="max-w-4xl mx-auto p-4">
    <div class="card bg-base-200 shadow-xl">
      {#if project.imageUrl}
        <figure class="px-4 pt-4">
          <img src={project.imageUrl} alt={project.title} class="rounded-xl max-h-96 object-cover w-full" />
        </figure>
      {/if}
      <div class="card-body">
        <h1 class="card-title text-3xl">{project.title}</h1>
        <p class="text-lg">{project.description}</p>
        
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

        <form on:submit={handleDonation} class="form-control gap-4 mt-8">
          <h2 class="text-2xl font-bold">Make a Donation</h2>
          
          {#if success}
            <div class="alert alert-success">
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{success}</span>
            </div>
          {/if}

          <div>
            <label class="label" for="amount">
              <span class="label-text">Donation Amount ($)</span>
            </label>
            <input
              type="number"
              id="amount"
              bind:value={donationAmount}
              placeholder="Enter amount"
              class="input input-bordered w-full"
              min="1"
              step="1"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label class="label" for="phone">
              <span class="label-text">Phone Number (for M-Pesa)</span>
              <span class="label-text-alt">Format: +254XXXXXXXXX</span>
            </label>
            <input
              type="tel"
              id="phone"
              bind:value={phoneNumber}
              placeholder="Enter phone number"
              class="input input-bordered w-full"
              pattern="^\+?[0-9]{10,12}$"
              required
              disabled={submitting}
            />
          </div>

          <button 
            type="submit" 
            class="btn btn-primary"
            disabled={submitting}
          >
            {#if submitting}
              <span class="loading loading-spinner"></span>
              Processing...
            {:else}
              Donate Now
            {/if}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add custom styles here if needed */
</style> 