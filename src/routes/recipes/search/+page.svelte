<script>
	import { fly } from 'svelte/transition';
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';

	import Card from '../../../components/Card.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').ActionData} */
	export let form;

	if (data.searched && data.results) {
		form = {
			results: data.results
		};
	}

	let search = $page.url.searchParams.get('q');
</script>

<svelte:head>
	<title>Search Recipes</title>
	<meta name="description" content="Search the cookbook" />
</svelte:head>

<h1>Search Recipes</h1>
<form method="POST" use:enhance>
	<input
		type="search"
		name="q"
		required
		aria-required="true"
		placeholder="Search by title..."
		bind:value={search}
	/><button class="search" type="submit">Search</button>
</form>

{#if form && form.results.length > 0}
	{#each form.results as result (result.id)}
		<div in:fly={{ y: 10 }}>
			<Card recipe={result} />
		</div>
	{/each}
{:else if form?.results.length === 0}
	<p>no results</p>
{/if}

<style>
	button {
		background: lightblue;
		border: 2px;
		padding: 5px;
		cursor: pointer;
		outline: inherit;
		box-shadow: 0 0 0 1px grey;
		border-radius: 5px;
	}

	button.search {
		background: cyan;
		margin-left: 10px;
	}

	input {
		border: 2px;
		border-radius: 5px;
		padding: 5px;
		outline: inherit;
		box-shadow: 0 0 0 1px grey;
	}
</style>
