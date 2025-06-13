<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>{page.status} {page.error?.message || 'An error occurred'}</h1>

<style>
	h1 {
		margin: auto;
		color: var(--text-3);
		max-width: fit-content;
	}
</style>
