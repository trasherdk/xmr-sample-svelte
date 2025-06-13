<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="error-container">
	<h1>{page.status} {page.error?.message || 'An error occurred'}</h1>
</div>

<style>
	.error-container {
		display: flex;
		flex-direction: column;
		min-height: 50vh;
		align-items: center;
		justify-content: center;
		background-color: var(--surface-1);
		color: var(--text-1);
		padding: 2rem;
	}

	.error-container h1 {
		margin: auto;
		color: var(--text-3);
		max-width: fit-content;
	}
</style>
