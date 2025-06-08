<script lang="ts">
	import { cn } from '$lib';
	import type { Conversation } from '../types/chat';
	import AddConversation from './AddConversation.svelte';

	const { show } = $props();

	let conversations = $state<Conversation[] | []>([]);

	$effect(() => {
		if (!show) return;

		fetch('/api/conversations')
			.then((res) => res.json())
			.then((data) => (conversations = data.conversations));
	});
</script>

<div
	class={cn(
		'fixed inset-y-0 z-50 max-w-sm bg-zinc-800 shadow-lg transition-all duration-300 ease-in-out md:absolute md:w-md md:translate-x-0',
		!show ? '-left-full' : 'left-0'
	)}
>
	<div
		class="flex items-center justify-between gap-2 border-b border-zinc-700 px-2 py-4 text-zinc-200"
	>
		<h2 class="text-lg font-semibold">
			Conversations [ {String(conversations.length).padStart(2, '0')} ]
		</h2>
		<AddConversation />
	</div>
	<div class="h-full">
		<div>
			<ul class="list-none">
				{#each conversations as conversation (conversation.session_id)}
					{#if conversation.title}
						<li class="list-item">
							<a
								data-sveltekit-reload
								href="/{conversation.session_id}"
								class="block h-full w-full cursor-pointer border-b border-zinc-700 px-2 py-4 text-start font-medium text-zinc-200 transition duration-150 hover:bg-zinc-700"
							>
								{conversation.title}
							</a>
						</li>
					{/if}
				{/each}
			</ul>
		</div>
	</div>
</div>
