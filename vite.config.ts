import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import path from 'path'

export default defineConfig(async () => {
	const tailwindcss = (await import('@tailwindcss/vite')).default
	
	return {
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
		tailwindcss(),
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
			shared: {
				react: {
					singleton: true,
					requiredVersion: '^18.0.0',
					eager: true,
				},
				'react-dom': {
					singleton: true,
					requiredVersion: '^18.0.0',
					eager: true,
				},
				'react-router-dom': {
					singleton: true,
					requiredVersion: '^6.0.0',
				},
				'@tanstack/react-query': {
					singleton: true,
					requiredVersion: '^5.0.0',
				},
				zustand: {
					singleton: true,
					requiredVersion: '^4.0.0',
				},
			} as any,
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
	}
})
