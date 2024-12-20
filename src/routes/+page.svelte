<script lang="ts">
	import Stopwatch from './Stopwatch.svelte';
</script>

<svelte:head>
	<title>Stopwatch</title>
	<meta name="description" content="A simple stopwatch implementation" />
</svelte:head>

<section>
	<h1>Stopwatch</h1>
	<Stopwatch />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		gap: 2rem;
	}
</style>
