import { Plugin } from 'ckeditor5';
import type { CommentsIntegrationInterface, Comment } from './CommentsIntegrationInterface.js';
/**
 * A plugin that implements the comments adapter integration with CKEditor Cloud Services.
 * This allows storing and retrieving comments from CKEditor's cloud infrastructure.
 */
export default class CloudServicesCommentsAdapter extends Plugin implements CommentsIntegrationInterface {
    /**
     * @inheritDoc
     */
    static get pluginName(): "CloudServicesCommentsAdapter";
    /**
     * @inheritDoc
     */
    static get requires(): readonly ["CloudServices"];
    private _cloudServicesToken;
    private _cloudServicesUrl;
    private _commentsEndpoint;
    private _localCache;
    /**
     * @inheritDoc
     */
    constructor(editor: any);
    /**
     * @inheritDoc
     */
    init(): Promise<void>;
    /**
     * Fetch helper that adds authorization headers
     */
    private _fetchWithAuth;
    /**
     * Loads comments from the server into local cache
     */
    private _loadComments;
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
    /**
     * Creates the document if it doesn't exist yet
     */
    private _ensureDocumentExists;
}
