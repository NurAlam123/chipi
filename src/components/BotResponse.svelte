<script lang="ts">
	import type { Message } from '../types/chat';
	import { renderMarkdownWithLatex } from '$lib/markdown';
	import { slide } from 'svelte/transition';
	import { cubicIn } from 'svelte/easing';

	let { response }: { response: Message } = $props();

	let isExpanded = $state(false);
</script>

<div class="flex justify-start">
	<div
		class="receive relative ml-2.5 w-fit max-w-[90%] space-y-3 rounded-2xl bg-zinc-700 px-3 py-4 break-words before:bg-zinc-700 after:bg-zinc-900"
	>
		{#if response}
			{#if response.reasoning && response.reasoning.trim()}
				<!-- Reasoning Section -->
				<div class="border-b border-zinc-600 pb-3">
					<button
						onclick={() => (isExpanded = !isExpanded)}
						class="flex w-full items-center gap-2 text-left font-medium text-zinc-300 transition-colors duration-200 hover:text-zinc-100"
						aria-expanded={isExpanded}
					>
						<svg
							class="h-4 w-4 transform transition-transform duration-200 {isExpanded
								? 'rotate-90'
								: ''}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
						<span class="text-sm">Thinking process</span>
						<span class="text-xs text-zinc-500">({response.reasoning.length} chars)</span>
					</button>

					{#if isExpanded}
						<div
							transition:slide={{ duration: 100, easing: cubicIn }}
							class="mt-3 rounded-lg border border-zinc-600/30 bg-zinc-800/50 p-3"
						>
							<div class="prose prose-invert prose-sm max-w-none text-zinc-300">
								<div class="mb-2 text-xs font-medium tracking-wide text-zinc-500 uppercase">
									Reasoning
								</div>
								{#await renderMarkdownWithLatex(response.reasoning)}
									<div class="animate-pulse space-y-2">
										<div class="h-3 w-3/4 rounded bg-zinc-600"></div>
										<div class="h-3 w-1/2 rounded bg-zinc-600"></div>
										<div class="h-3 w-5/6 rounded bg-zinc-600"></div>
									</div>
								{:then value}
									<div class="reasoning-content">
										{@html value}
									</div>
								{/await}
							</div>
						</div>
					{/if}
				</div>
			{/if}

			<!-- Main Response -->
			<div class="prose prose-invert max-w-none text-zinc-100">
				{#await renderMarkdownWithLatex(response.content || '')}
					<div class="animate-pulse space-y-2">
						<div class="h-4 w-full rounded bg-zinc-600"></div>
						<div class="h-4 w-4/5 rounded bg-zinc-600"></div>
						<div class="h-4 w-3/5 rounded bg-zinc-600"></div>
					</div>
				{:then value}
					{@html value}
				{/await}
			</div>
		{/if}
	</div>
</div>

<style>
</style>
