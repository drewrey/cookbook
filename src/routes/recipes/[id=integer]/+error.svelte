<script>
	import { page } from '$app/stores';
</script>

<h1>Whoops!</h1>

<p>
	{$page?.error?.message || 'default'}
</p>

<a href="/recipes/search">Back to Search</a>
