<script lang="ts">
	import Brand from './Brand.svelte';
	import Navbar from './Navbar.svelte';
	import User from './User.svelte';
	import Theme from './Theme.svelte';
</script>

<header>
	<section>
		<Brand />
		<Navbar />
	</section>
	<section>
		<User />
		<Theme />
	</section>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		background-color: var(--surface-1);
	}

	section {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
