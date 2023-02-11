<script>
	import data from '$lib/data/search_banana_pudding.json';
</script>

<h1>Recipes</h1>

<div class="grid">
	{#each data.results[0].hits as hit}
		<div>
			<h1>{hit.document.title}</h1>
			<p>{hit.document.directions.join(', ')}</p>
		</div>
		<a href="/recipes/{hit.document.id}">View Recipe</a>
	{/each}
</div>
