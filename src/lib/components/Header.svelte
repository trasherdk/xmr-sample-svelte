<script lang="ts">
	import Navbar from './Navbar.svelte';
	import User from './User.svelte';
	import Theme from './Theme.svelte';
</script>

<header>
	<brand>
		<logo></logo>
		<websitename>XMR Sample (Svelte)</websitename>
	</brand>
	<Navbar />
	<usercontainer>
		<User />
		<Theme />
	</usercontainer>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 1rem;
		background-color: var(--surface-1);
	}

	brand {
		display: flex;
		background-color: transparent;
		align-items: center;
		gap: 1rem;
		margin-right: 2rem;
	}

	websitename {
		font-size: 1.5rem;
		font-weight: bold;
	}

	logo {
		height: 40px;
		width: 40px;
		margin-right: 0.5rem;
		/* Placeholder for the actual logo */
	}

	usercontainer {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
</style>
