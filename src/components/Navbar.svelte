<script lang="ts">
	import AlignLeft from '../assets/align-left.svelte';
	import Sidebar from './Sidebar.svelte';
	import { title, isAlive } from '$lib/stores.svelte';
	import { onMount } from 'svelte';
	import ToggleButton from './ToggleButton.svelte';
	import { page } from '$app/state';

	let sidebarContainer: HTMLDivElement | null = $state(null);
	let sidebarShow = $state(false);

	const isHome = $derived(page.url.pathname === '/');

	onMount(() => {
		document.addEventListener('click', (event: MouseEvent) => {
			const target = event.target as Node;
			if (!sidebarContainer) return;
			if (!sidebarContainer.contains(target)) {
				sidebarShow = false;
			}
		});

		fetch('/api/ping')
			.then((res) => {
				if (!res.ok) isAlive.set(false);
				return;
			})
			.catch(() => isAlive.set(false));
	});
</script>

<nav
	class="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-4 py-3 text-white shadow-md"
>
	{#if !isHome}
		<div bind:this={sidebarContainer}>
			<button
				class="cursor-pointer"
				aria-label="show sidebar"
				onclick={() => {
					sidebarShow = !sidebarShow;
				}}><AlignLeft /></button
			>
			<Sidebar show={sidebarShow} />
		</div>
	{/if}

	<div class="flex flex-1 items-center justify-between">
		<div class="flex flex-1 items-center gap-2">
			<div class="flex gap-2">
				<a href="/" class="flex items-center gap-2 text-sm font-semibold">
					Chipi
					<img src="/chipi.png" alt="Chipi" class="size-6" />
				</a>
				<p class="flex items-center gap-1 text-sm">
					{#if $isAlive}
						<span class="inline-block size-3 rounded-full border-3 border-green-400 bg-green-600"
						></span><span>Active Now</span>
					{:else}
						<span class="inline-block size-3 rounded-full border-3 border-zinc-700 bg-zinc-800"
						></span><span>Offline</span>
					{/if}
				</p>
			</div>
			{#if !isHome}
				<div
					class="absolute top-16 left-1/2 z-10 flex max-w-64 -translate-x-1/2 items-center gap-2 rounded-full bg-zinc-900/30 px-4 py-0.5 text-sm capitalize backdrop-blur-md"
				>
					<div class="flex-1 truncate">{$title}</div>
				</div>
			{/if}
		</div>
	</div>

	<ToggleButton />
</nav>
