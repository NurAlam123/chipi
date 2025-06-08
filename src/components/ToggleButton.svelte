<script lang="ts">
	import { cn } from '$lib';
	import { brain } from '$lib/stores.svelte';
</script>

<div class="flex items-center justify-center gap-2">
	<span class="block text-sm font-semibold">Brain</span>
	<button
		class={cn(
			'flex w-12 cursor-pointer rounded-xl border border-zinc-300 p-0.5 transition duration-100 ease-in-out',
			$brain ? 'bg-blue-100' : 'bg-zinc-100'
		)}
		role="switch"
		aria-checked={$brain}
		aria-label="toggle-reasoning"
		onclick={() => brain.set(!$brain)}
	>
		<span
			class={cn(
				'inline-block h-4 w-4 rounded-full transition duration-100 ease-in-out',
				$brain ? 'translate-x-6.5 bg-blue-400' : 'translate-x-0 bg-zinc-400'
			)}
		></span>
	</button>
</div>
