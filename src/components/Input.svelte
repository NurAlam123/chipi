<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Send from '../assets/send.svelte';

	let area: HTMLTextAreaElement;
	let form: HTMLFormElement;

	let { submit, responsing } = $props();

	const submitOnKey = (event: KeyboardEvent) => {
		const key = event.key;
		if (key === 'Enter' && event.ctrlKey) {
			form.requestSubmit();
		}
	};

	onMount(() => {
		if (!area) return;
		area.addEventListener('keydown', submitOnKey);
	});

	onDestroy(() => {
		if (!area) return;
		area.removeEventListener('keydown', submitOnKey);
	});
</script>

<form
	class="flex gap-2 rounded-lg border-2 border-zinc-800 bg-zinc-900 px-4 py-2"
	onsubmit={submit}
	bind:this={form}
>
	<textarea
		placeholder="Ask your question"
		class="h-24 flex-1 resize-none overflow-auto border-none bg-inherit p-4 py-2 ring-0 outline-none"
		name="prompt"
		bind:this={area}
	></textarea>
	<button
		disabled={responsing}
		type="submit"
		class="mt-4 flex h-fit cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 p-3 transition duration-100 hover:bg-zinc-800/60 active:scale-95 disabled:cursor-not-allowed disabled:active:scale-100"
	>
		<Send />
	</button>
</form>
