<script lang="ts">
	import type { PageProps } from '../$types';
	import BotResponse from '../../components/BotResponse.svelte';
	import type { ConversationResponse } from '../../types/chat';
	import { brain } from '$lib/stores.svelte';
	import Input from '../../components/Input.svelte';

	let { data }: PageProps = $props();
	let responses = $derived(data as ConversationResponse);
	let responsing = $state(false);

	const sumbitHandler = (e: SubmitEvent) => {
		const form = e.target as HTMLFormElement;

		if (!form) return;

		const prompt = form.prompt.value as string;
		if (!prompt || prompt.trim() === '') return;

		// Add user message and update
		responses = {
			...responses,
			messages: [
				...responses.messages,
				{
					role: 'user',
					content: prompt,
					reasoning: ''
				}
			]
		};

		const session_id = window.location.pathname.replace('/', '');

		// Get the stream from backend
		const eventSource = new EventSource(
			`/api/conversations/${session_id}/stream?prompt=${prompt}&thinking=${$brain}`
		);

		let thinking = false;
		let thinkingContent = '';
		let botContent = '';

		// Add a default bot response and update
		responses = {
			...responses,
			messages: [
				...responses.messages,
				{
					role: 'assistant',
					content: '',
					reasoning: ''
				}
			]
		};

		try {
			eventSource.onmessage = (event) => {
				responsing = true;

				if (event.data.replaceAll('\n', '').replaceAll('\\n', '').trim() === '<think>') {
					thinking = true;
					return;
				}

				if (event.data.replaceAll('\n', '').replaceAll('\\n', '').trim() === '</think>') {
					thinking = false;
					return;
				}

				if (thinking) {
					thinkingContent += event.data;
				} else {
					botContent += event.data;
				}

				const updateMessages = [...responses.messages];
				const last = updateMessages.length - 1;
				responses.messages[last] = {
					...updateMessages[last],
					content: botContent,
					reasoning: thinkingContent
				};
			};

			eventSource.onerror = () => {
				eventSource.close();
				responsing = false;
				return;
			};
		} catch {
			console.log('ERROR');
		}

		form.reset();
	};
</script>

<section class="relative flex h-full flex-col justify-between px-4">
	<div class="flex h-full flex-1 flex-col space-y-4 overflow-auto pt-12 pb-2">
		{#each responses.messages as message, i (i)}
			{#if message.role === 'user'}
				<div class="flex justify-end">
					<div
						class="sent relative mr-2.5 w-fit max-w-[90%] rounded-2xl bg-blue-700 px-3 py-4 break-words before:bg-blue-700 after:bg-zinc-900"
					>
						<p>{message.content}</p>
					</div>
				</div>
			{/if}
			{#if message.role === 'assistant'}
				<BotResponse response={message} />
			{/if}
		{/each}
	</div>

	<div class=" w-full bg-zinc-900 pb-0.5">
		<Input {responsing} submit={sumbitHandler} />
	</div>
</section>
