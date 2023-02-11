<script>
	/** @type {import('./$types').PageServerData}*/
	export let data;
</script>

<h1>{data.recipe.document.title}</h1>
<div>
	<h2><b>Ingredients</b></h2>
	<ul>
		{#each data.recipe.document.ingredients_with_measurements as ingredient}
			<li>{ingredient}</li>
		{/each}
	</ul>
</div>
<div>
	<h2><b>Directions</b></h2>
	<ul>
		{#each data.recipe.document.directions as direction}
			<li>{direction}</li>
		{/each}
	</ul>
</div>

<style>
	h1 {
		text-align: left;
	}
</style>
