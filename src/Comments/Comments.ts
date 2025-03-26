import { Plugin } from 'ckeditor5';
import CloudServicesCommentsAdapter from './CloudServicesCommentsAdapter';

// Add this interface to properly type the CKEditor Comments plugin
interface CommentsPlugin {
  adapter: any;
}

/**
 * The Comments plugin.
 */
export default class Comments extends Plugin {
  /**
   * @inheritDoc
   */
  public static get pluginName() {
    return 'RooleComments' as const;
  }

  /**
   * @inheritDoc
   */
  public static get requires() {
    return [CloudServicesCommentsAdapter] as const;
  }

  /**
   * @inheritDoc
   */
  public init(): void {
    const editor = this.editor;

    // Check if both Users and Comments plugins are available
    if (editor.plugins.has('Comments') && editor.plugins.has('Users')) {
      try {
        // Use only CloudServicesCommentsAdapter
        const commentsAdapter = editor.plugins.get('CloudServicesCommentsAdapter');
        console.log('Using Cloud Services Comments Adapter');

        // Set the adapter on the Comments plugin
        (editor.plugins.get('Comments') as unknown as CommentsPlugin).adapter = commentsAdapter;
      } catch (error) {
        console.error('Error initializing Comments adapter:', error);
      }
    } else {
      console.warn('Comments or Users plugin not available');
    }
  }
}
