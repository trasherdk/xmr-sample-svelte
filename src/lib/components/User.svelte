<script lang="ts">
	import { UserIcon } from 'svelte-feather-icons';
</script>

<div class="user-info">
	<UserIcon />
</div>

<style>
	.user-info {
		display: flex;
		cursor: pointer;
		color: var(--text-1);
		background-color: var(--surface-1);
		border-radius: 50%;
		padding: 0.5rem;
		width: 2rem;
		height: 2rem;
		transition: background-color 0.3s ease;
		&:hover {
			background-color: var(--surface-3);
		}
	}
</style>
