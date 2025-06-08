<script lang="ts">
	import { goto } from '$app/navigation';
	import { title } from '$lib/stores.svelte';
	import Add from '../assets/add.svelte';
	import type { NewConversationResponse } from '../types/chat';

	const addNewConversation = () => {
		fetch('/api/conversations/new', { method: 'POST' })
			.then((res) => res.json())
			.then((data: NewConversationResponse) => {
				title.set(data.title);
				goto(`/${data.session_id}`, {
					replaceState: true
				}).then(() => {
					window.location.reload();
				});
			});
	};
</script>

<button
	aria-label="new-conversation"
	class="flex size-8 cursor-pointer items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 transition duration-150 hover:bg-zinc-700 active:scale-95"
	onclick={addNewConversation}
>
	<Add />
</button>
