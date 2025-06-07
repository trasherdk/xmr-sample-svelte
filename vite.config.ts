import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { copyFileSync, mkdirSync } from "fs";
import { nodePolyfills } from "vite-plugin-node-polyfills";

mkdirSync("public", { recursive: true });
[
	{
		src: "node_modules/monero-ts/dist/monero.worker.js",
		dest: "public/monero.worker.js",
	}
].forEach(({ src, dest }) => copyFileSync(src, dest))

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({ include: ["http", "https", "fs", "stream", "util", "path"] }),
		{
			name: "copy-files",
			writeBundle: () => [
				{
					src: "node_modules/monero-ts/dist/monero.worker.js",
					dest: "dist/monero.worker.js",
				}
			].forEach(({ src, dest }) => copyFileSync(src, dest))
		}
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
