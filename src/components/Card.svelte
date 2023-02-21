<script>
	import { fly } from 'svelte/transition';
	import { goto } from '$app/navigation';

	import { parseStringifiedArray } from '$lib/utils/parseData';

	/**
	 * @typedef RecipeShape
	 * @type {object} recipe
	 * @property {string} title
	 * @property {string} ner
	 * @property {string} id
	 */

	/**
	 * @type {RecipeShape}
	 */
	export let recipe;
</script>

<div class="card" in:fly={{ y: 10 }}>
	<h2>{recipe.title}</h2>
	<div>
		<i>Main ingredients</i>:<br />

		<ul>
			{#each parseStringifiedArray(recipe.ner) as ingredient}
				<li>{ingredient}</li>
			{/each}
		</ul>
	</div>
	<div class="width: 100px">
		<button title="View Recipe" on:click={() => goto('/recipes/' + recipe.id)}>View Recipe</button>
	</div>
</div>

<style>
	h2 {
		font-weight: bold;
	}

	div.card {
		border: 1px solid black;
		border-radius: 5px;
		box-shadow: 0 5px 5px #000000;
		padding: 1rem;
		margin: 2rem;
	}
</style>
