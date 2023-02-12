<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	// TODO: this is ugly, need to decide how to separate form/data
	const syncFormToData = (some) => {
		form = some;
	};
</script>

<h1>Search</h1>
<form method="POST" use:enhance>
	<input type="search" name="q" /><button type="submit">Search</button>
</form>

{#await data}
	<p>loading...</p>
{:then data}
	{syncFormToData(data)}
	{#if form && form.results}
		{#each form.results as result}
			<div>
				<h2>{result.title}</h2>
				<p>{result.directions}</p>
			</div>
			<a href="/recipes/{result.id}">View Recipe</a>
		{/each}
	{/if}
	{#if form && form.results.length === 0}
		<p>no results</p>
	{:else}
		<div class="grid">
			{#if form}
				{#each form?.results[0] as recipe}
					<div>
						<div>
							<h2>{recipe.title}</h2>
							<p>{recipe.directions}</p>
						</div>
						<!-- TODO: this link is unreliable -->
						<button onClick={goto('/recipes/' + recipe.id)}>View Recipe</button>
					</div>
				{/each}
			{/if}
		</div>
	{/if}
{/await}
