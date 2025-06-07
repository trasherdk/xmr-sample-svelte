/**
 * A simple class to manage local storage values.
 * From: https://x.com/ankurpsinghal/status/1857150197408923910
 *
 * Example usage:
 * ```ts
 * import LocalStorage from '$lib/utils/localstorage.svelte';
 * const ls = new LocalStorage('my-key', 'my-value');
 * ls.value; // 'my-value'
 * ls.value = 'new-value';
 * ls.value; // 'new-value'
 * ```
 */

class LocalStorage {
	key: string = '';
	value: any = $state(null);

	constructor(key: string, initialValue: any) {
		this.key = key;
		this.value = this.getLocalStorageValue() || initialValue;
		this.startWatching();
	}

	getLocalStorageValue() {
		return localStorage.getItem(this.key);
	}

	startWatching() {
		$effect(() => {
			localStorage.setItem(this.key, $state.snapshot(this.value));
		});
	}
}

export default LocalStorage;
