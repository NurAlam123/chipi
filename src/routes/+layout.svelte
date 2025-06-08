<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';

	let { children } = $props();
</script>

<main class="mx-auto max-w-2xl">
	<Navbar />
	{@render children()}
</main>
