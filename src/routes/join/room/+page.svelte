<script lang="ts">
  import { goto } from '$app/navigation';
  import { joinRoom } from '$lib/room';
  import toast, { Toaster } from 'svelte-french-toast';
  import Footer from '../../../components/Footer.svelte';
  import { checkLink } from '$lib/check';
  import { onMount } from 'svelte';

  let userId = '';
  let status = false;
  let joinRoomId = '';
  let roomPassword = '';
  let isLoading = false;
  let error = '';
  let isPageLoading = true;

  onMount(async () => {
    status = await checkLink("https://api.k9crypt.xyz");
    userId = localStorage.getItem('userId') || '';
    setTimeout(() => isPageLoading = false, 1000);
  });

  async function handleJoinRoom() {
    if (!userId || !joinRoomId) {
      error = 'Please enter both User ID and Room ID';
      return;
    }
    isLoading = true;
    error = '';

    try {
      await joinRoom(joinRoomId, userId, roomPassword);
      localStorage.setItem('userId', userId);
      toast.success('Joined room successfully!', { duration: 3000, position: 'top-right' });
      goto(`/room/${joinRoomId}`);
    } catch (err) {
      error = 'Failed to join room. Please try again.';
    } finally {
      isLoading = false;
    }
  }
</script>

{#if isPageLoading}
<section class="flex items-center justify-center min-h-screen py-12 px-4">
  <div class="w-full max-w-lg flex items-center justify-center">
    <i class="ri-loader-3-line text-6xl animate-spin" style="animation: rotate 1s linear infinite;"></i>
  </div>
</section>

<style>
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
{:else if status}
<Toaster />
<section class="flex items-center justify-center min-h-screen py-12 px-4">
  <div class="w-full max-w-lg">
    <h2 class="text-2xl font-bold text-center mb-6">Join Room</h2>
    <div>
      <p class="mb-2 text-sm">Enter your User ID to join a room.</p>
      <input bind:value={userId} type="text" placeholder="User ID" class="w-full mb-4 p-2 rounded-lg border-2 border-dark-green focus:outline-none" />
      <p class="mb-2 text-sm">Enter the Room ID to join a room.</p>
      <input bind:value={joinRoomId} type="text" placeholder="Room ID" class="w-full mb-4 p-2 rounded-lg border-2 border-dark-green focus:outline-none" />
      <p class="mb-2 text-sm">Enter the Room Password (if required).</p>
      <input bind:value={roomPassword} type="password" placeholder="Room Password" class="w-full mb-4 p-2 rounded-lg border-2 border-dark-green focus:outline-none" />
      
      <button on:click={handleJoinRoom} class="px-6 py-2 border-2 border-light-green bg-light-green rounded-lg disabled:opacity-50" disabled={userId === '' || joinRoomId === '' || isLoading}>
        <i class="ri-door-line mr-1"></i> {isLoading ? 'Joining...' : 'Join Room'}
      </button>

      {#if error}
        <p class="mt-4 text-red-500 text-sm">{error}</p>
      {/if}
    </div>
  </div>
</section>
<Footer />
{:else}
<section class="flex items-center justify-center min-h-screen py-12 px-4">
  <div class="w-full max-w-lg">
    <div class="bg-red-100 p-3 rounded-full">
        <p class="text-center text-red-600"><i class="ri-error-warning-fill mr-1"></i> System is currently offline. Please check back later.</p>
    </div>
  </div>
</section>
{/if}
