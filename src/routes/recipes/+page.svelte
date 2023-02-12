<script>
	/** @type {import('./$types').PageData}*/
	export let data;
</script>

<h1>Recipes</h1>

<div class="grid">
	{#each data.recipes as recipe}
		<div>
			<h2>{recipe.title}</h2>
			<p>{recipe.directions}</p>
		</div>
		<a href="/recipes/{recipe.id}">View Recipe</a>
	{/each}
</div>

<style>
	h2 {
		font-weight: bold;
	}
</style>
