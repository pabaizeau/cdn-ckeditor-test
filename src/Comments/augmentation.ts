import type { Comments, CommentsIntegration } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
  interface PluginsMap {
    [Comments.pluginName]: Comments;
    [CommentsIntegration.pluginName]: CommentsIntegration;
  }
}

