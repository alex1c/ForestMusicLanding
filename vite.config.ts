import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	// Own domain forest-music.ru — assets resolve from site root
	base: '/',
	plugins: [react()],
	build: {
		// Static files for Apache DocumentRoot
		outDir: 'dist',
		assetsInlineLimit: 4096,
		sourcemap: false,
		// DIAGNOSTIC: emit JS as .mjs to test browser delivery vs .js hang
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name]-[hash].mjs',
				chunkFileNames: 'assets/[name]-[hash].mjs',
			},
		},
	},
})
