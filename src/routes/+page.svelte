<script lang="ts">
	import { getRelativeTimeFromISO } from '$lib';
	import { isAlive } from '$lib/stores.svelte';
	import AddConversation from '../components/AddConversation.svelte';
	import type { Conversation } from '../types/chat';

	let conversations = $state<Conversation[]>([]);
	$effect(() => {
		if (!$isAlive) return;
		fetch('/api/conversations')
			.then((res) => {
				if (res.ok) return res.json();
			})
			.then((data) => {
				if (data) conversations = data.conversations;
				return;
			});
	});
</script>

<section class="flex h-svh w-full items-center justify-center">
	{#if !$isAlive}
		<div class="text-center">
			<h3 class="text-2xl font-semibold text-zinc-300">Bot is offline.</h3>
			<p class="text-zinc-400">Start the backend server and refresh</p>
		</div>
	{:else}
		<div class="mx-6 w-full">
			<div class="mb-2 flex justify-between border-b border-zinc-300 pb-2 text-zinc-300">
				<h3 class="text-2xl font-semibold">Recent Conversations</h3>
				<AddConversation />
			</div>
			{#if conversations.length > 0}
				<ul>
					{#each conversations as conversation (conversation.session_id)}
						<li class="mb-2">
							<a
								data-sveltekit-reload
								href="/{conversation.session_id}"
								class="block rounded-lg bg-zinc-800 px-4 py-6 text-lg font-medium capitalize hover:bg-neutral-800"
							>
								<span class="block">
									{conversation.title}
								</span>
								<span class="block text-xs text-zinc-400"
									>{getRelativeTimeFromISO(conversation.created_at)}</span
								>
							</a>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-center text-zinc-400">No conversations</p>
			{/if}
		</div>
	{/if}
</section>
