<script>
	/** @type {import('./$types').PageData}*/
	export let data;

	import { linear } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { parseStringifiedArray } from '$lib/utils/parseData';

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

	/**
	 * TODO: this should go in the import script
	 * @param {string} str
	 */
	const convertDegreeSymbol = (str) => {
		console.log(str);
		return str.replace('\\u00b0', '°');
	};
</script>

<svelte:window on:keydown={handleKeyDown} />

<main in:fade={{ duration: 250, easing: linear }}>
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
		<h2><b>Ingredients With Measurements</b></h2>
		<ul>
			{#each parseStringifiedArray(data.recipe.ingredients) as ingredient}
				<li>{ingredient}</li>
			{/each}
		</ul>
	</div>
	<div>
		<h2><b>Parsed Ingredients</b></h2>
		<ul>
			{#each parseStringifiedArray(data.recipe.ner) as ingredient}
				<li>{ingredient}</li>
			{/each}
		</ul>
	</div>
	<div>
		<h2><b>Directions</b></h2>
		<ul>
			{#each parseStringifiedArray(data.recipe.directions) as direction}
				<li>{convertDegreeSymbol(direction)}</li>
			{/each}
		</ul>
	</div>
	<div>
		<h2><b>Source</b></h2>
		<!-- TODO: format this URL more reliably -->
		<a data-sveltekit-reload rel="noreferrer" href={'http://' + data.recipe.link} target="_blank"
			>{data.recipe.link}</a
		>
	</div>

	<hr />
	<a href="/recipes/search">Back to Search</a>
	<a href="/recipes/{data.recipe.id + 1}">Next Recipe</a>
	{#if data.recipe.id > 0}
		<a href="/recipes/{data.recipe.id - 1}">Previous Recipe</a>
	{/if}
</main>

<style>
	h1 {
		text-align: left;
	}

	hr {
		height: 10px;
		width: 100%;
	}
</style>
