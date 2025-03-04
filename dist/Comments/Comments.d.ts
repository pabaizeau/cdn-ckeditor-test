import { Plugin } from 'ckeditor5';
import CommentsIntegration from './CommentsIntegration';
/**
 * The Comments plugin.
 */
export default class Comments extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "RooleComments";
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof CommentsIntegration];
    /**
     * @inheritDoc
     */
    init(): void;
}
