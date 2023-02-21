<script>
	/** @type {import('./$types').PageData}*/
	export let data;

	import { parseStringifiedArray } from '$lib/utils/parseData';
</script>

<svelte:head>
	<title>Browse Recipes</title>
	<meta name="description" content="Browse the cookbook" />
</svelte:head>

<h1>Recipes</h1>

<div class="grid">
	{#each data.recipes as recipe}
		<div>
			<h2>{recipe.title}</h2>
			<div>
				<i>Main ingredients</i>:<br />

				<ul>
					{#each parseStringifiedArray(recipe.ner) as ingredient}
						<li>{ingredient}</li>
					{/each}
				</ul>
			</div>
		</div>
		<a href="/recipes/{recipe.id}">View Recipe</a>
	{/each}
</div>

<style>
	h2 {
		font-weight: bold;
	}
</style>
