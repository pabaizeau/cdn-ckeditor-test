import { Plugin } from 'ckeditor5';
import type { CommentsIntegrationInterface, Comment } from './CommentsIntegrationInterface.js';
/**
 * A plugin that implements the comments adapter integration.
 */
export default class CommentsIntegration extends Plugin implements CommentsIntegrationInterface {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CommentsIntegration";
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["RooleComments"];
    private _comments;
    /**
     * @inheritDoc
     */
    constructor(editor: any);
    /**
     * @inheritDoc
     */
    init(): Promise<void>;
    /**
     * @inheritDoc
     */
    addComment(commentData: Partial<Comment>): Promise<Comment>;
    /**
     * @inheritDoc
     */
    updateComment(commentData: Comment): Promise<Comment>;
    /**
     * @inheritDoc
     */
    removeComment(commentId: string): Promise<void>;
    /**
     * @inheritDoc
     */
    getComment(commentId: string): Promise<Comment>;
    /**
     * @inheritDoc
     */
    getComments(): Promise<Comment[]>;
}
