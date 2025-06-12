<script lang="ts">
	import { setContext } from 'svelte';
	import { browser, dev } from '$app/environment';
	import { RenderScan } from 'svelte-render-scan';
	import '$lib/styles/theme.css';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import LocalStorage from '$lib/utils/localstorage.svelte';

	let themeStore: LocalStorage;

	/**
	 * @typedef {Object} UserContext
	 * @property {string} user
	 * @property {string} theme
	 */
	let userContext = $state({
		user: null,
		theme: ''
	});

	$effect(() => {
		const theme = userContext.theme;
		document.body.setAttribute('data-theme', theme);
		document.body.style.setProperty('--color-scheme', theme);
		themeStore.value = theme;
		console.log('userContext.theme', theme);
	});

	setContext('UserContext', userContext);

	if (browser) {
		themeStore = new LocalStorage(
			'theme',
			window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		);
		userContext.theme = themeStore.value;
	}
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { data, children } = $props();
</script>

<container>
	<Header />
	{#if dev}
		<RenderScan />
	{/if}
	<main>
		{@render children?.()}
	</main>

	<footer>
		<p>© 2024 TrasherDK</p>
	</footer>
</container>

<style>
	container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		overflow-y: auto;
	}
</style>
