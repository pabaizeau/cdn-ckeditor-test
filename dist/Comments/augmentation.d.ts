import type { Comments } from './index.js';
declare module '@ckeditor/ckeditor5-core' {
    interface PluginsMap {
        [Comments.pluginName]: Comments;
    }
}
