import type { CloudServicesCommentsAdapter } from './index.js';

declare module '@ckeditor/ckeditor5-core' {
  interface PluginsMap {
    ['CloudServicesCommentsAdapter']: CloudServicesCommentsAdapter;
  }
}
