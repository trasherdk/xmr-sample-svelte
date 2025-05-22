<script lang="ts">
	import { browser } from '$app/environment';
	import '$lib/styles/theme.css'
	import '../app.css';

	if (browser) {
		document.body.setAttribute('data-theme', window.matchMedia('(prefers-color-scheme: dark)')
		.matches ? 'dark' : 'light');
	}
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
</script>

<container>
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
</container>

<style>
	/* Empty */
</style>
