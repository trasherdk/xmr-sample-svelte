<script lang="ts">
	import { getContext } from 'svelte';
	import { SunIcon, MoonIcon } from 'svelte-feather-icons';

	let userContext = getContext('UserContext') as { theme: string };
</script>

<div class="theme-toggle">
	<fieldset>
		<label>
			<input type="radio" name="theme" value="dark" bind:group={userContext.theme} />
			<span><MoonIcon /></span>
		</label>
		<label>
			<input type="radio" name="theme" value="light" bind:group={userContext.theme} />
			<span><SunIcon /></span>
		</label>
	</fieldset>
</div>

<style>
	.theme-toggle {
		fieldset {
			display: flex;
			border: 0;
			padding: 0;
			margin: 0;
			max-width: fit-content;
		}
		input[type='radio'] {
			display: none;
		}
	}

	label span {
		display: none;
		cursor: pointer;
	}

	input[type='radio']:not(:checked) + span {
		display: block;
	}
</style>
