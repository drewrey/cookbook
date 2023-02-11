<script>
	import { enhance } from '$app/forms';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<h1>Search</h1>
<form method="POST" use:enhance>
	<input type="search" name="search" /><button type="submit">Search</button>
</form>

{#if form?.data}
	{#if Object.keys(data.data).includes('results')}
		{#if data.data.results[0].hits.length === 0}
			<p>no results</p>
		{:else}
			<div class="grid">
				{#each data.data.results[0].hits as hit}
					<div>
						<h2>{hit.document.title}</h2>
						<p>{hit.document.directions.join(', ')}</p>
					</div>
					<a href="/recipes/{hit.document.id}">View Recipe</a>
				{/each}
			</div>
		{/if}
	{:else}
		<p>no search results</p>
	{/if}
{/if}
