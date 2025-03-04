import vitejsPluginReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		open: true,
	  },
	plugins: [vitejsPluginReact()],
	resolve: {
		extensions: ['.js', '.ts', '.tsx', '.json']
	}
});
