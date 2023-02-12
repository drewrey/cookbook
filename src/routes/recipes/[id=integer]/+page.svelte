<script>
	/** @type {import('./$types').PageData}*/
	export let data;

	import { goto } from '$app/navigation';

	/**
	 * @type string | null
	 */
	let key;

	/**
	 * @param event {KeyboardEvent}
	 */
	function handleKeyDown(event) {
		key = event.key;
	}

	function resetKey() {
		key = null;
	}
</script>

<svelte:window on:keydown={handleKeyDown} />

{#if key}
	{#if key === 'ArrowRight'}
		{resetKey()}
		{goto('/recipes/' + (data.recipe.id + 1))}
	{/if}
	{#if key === 'ArrowLeft' && data.recipe.id > 0}
		{resetKey()}
		{goto('/recipes/' + (data.recipe.id - 1))}
	{/if}
{/if}

<h1>{data.recipe.title}</h1>
<div>
	<h2><b>Ingredients</b></h2>
	<ul>
		{#each data.recipe.ingredients
			.split('"')
			.slice(1, -1)
			.filter((x) => x !== ', ') as ingredient}
			<li>{ingredient}</li>
		{/each}
	</ul>
</div>
<div>
	<h2><b>Directions</b></h2>
	<ul>
		{#each data.recipe.directions
			.split('"')
			.slice(1, -1)
			.filter((x) => x !== ', ') as direction}
			<li>{direction}</li>
		{/each}
	</ul>
</div>

<a href="/recipes/search">Back to Search</a>
<a href="/recipes/{data.recipe.id + 1}">Next Recipe</a>
{#if data.recipe.id > 0}
	<a href="/recipes/{data.recipe.id - 1}">Previous Recipe</a>
{/if}

<style>
	h1 {
		text-align: left;
	}
</style>
