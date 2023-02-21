<script>
	/** @type {import('./$types').PageData}*/
	export let data;

	import Card from '../../components/Card.svelte';
</script>

<svelte:head>
	<title>Browse Recipes</title>
	<meta name="description" content="Browse the cookbook" />
</svelte:head>

<h1>Recipes</h1>

<div>
	{#each data.recipes as recipe}
		<Card {recipe} />
	{/each}
</div>
