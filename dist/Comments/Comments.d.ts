import { Plugin } from 'ckeditor5';
import CloudServicesCommentsAdapter from './CloudServicesCommentsAdapter';
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
    static get requires(): readonly [typeof CloudServicesCommentsAdapter];
    /**
     * @inheritDoc
     */
    init(): void;
}
