import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig({
	base: '/',
	server: {
		port: 3002,
		origin: 'http://localhost:3002',
		fs: {
			allow: ['.', '../shared'],
		},
	},
	plugins: [
		react(),
		federation({
			name: 'ai',
			filename: 'remoteEntry.js',
			exposes: {
				'./App': './src/App.tsx',
				'./BooksPage': './src/pages/BooksPage.tsx',
				'./BookDetailPage': './src/pages/BookDetailPage.tsx',
				'./BookChaptersPage': './src/pages/BookChaptersPage.tsx',
				'./BookCoverPage': './src/pages/BookCoverPage.tsx',
				'./BookExportPage': './src/pages/BookExportPage.tsx',
			},
			shared: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	build: {
		modulePreload: false,
		target: 'esnext',
		minify: false,
		cssCodeSplit: false,
	},
})
