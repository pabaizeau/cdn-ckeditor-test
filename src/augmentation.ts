import type { Editorjs } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ Editorjs.pluginName ]: Editorjs;
	}
}
