<script>
	import '../app.css';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<div class="app">
	<header>
		<div class="logo-container">
			<div class="logo"></div>
			<span class="website-name">XMR Sample (Svelte)</span>
		</div>
	</header>

	<main>
		{@render children?.()}
	</main>

	<footer>
		<p>© 2024 TrasherDK</p>
	</footer>
</div>

<style>
	/* Empty */
</style>
