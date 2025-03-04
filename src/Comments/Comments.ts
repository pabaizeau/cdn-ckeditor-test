import { Plugin } from 'ckeditor5';
import CommentsIntegration from './CommentsIntegration';

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
    return [CommentsIntegration] as const;
  }

  /**
   * @inheritDoc
   */
  public init(): void {
    const editor = this.editor;

    // If the CKEditor Comments plugin is available, set our adapter as the comments adapter
    if (editor.plugins.has('Comments')) {
      const commentsIntegration = editor.plugins.get('CommentsIntegration');
      // Add type assertion to fix the error
      (editor.plugins.get('Comments') as unknown as CommentsPlugin).adapter = commentsIntegration;
    }
  }
}
