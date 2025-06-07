<script lang="ts">
	import { setContext } from 'svelte';
	import { browser } from '$app/environment';
	import '$lib/styles/theme.css';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import LocalStorage from '$lib/utils/localstorage.svelte';

	/**
	 * @typedef {Object} UserContext
	 * @property {string} user
	 * @property {string} theme
	 */

	let themeStore: LocalStorage;
	let userContext = $state({
		user: null,
		theme: ''
	});

	$effect(() => {
		document.body.setAttribute('data-theme', userContext.theme);
		document.body.style.setProperty('--color-scheme', userContext.theme);
		themeStore.value = userContext.theme;
		console.log('userContext.theme', userContext.theme);
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
	let { children } = $props();
</script>

<container>
	<Header />
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
