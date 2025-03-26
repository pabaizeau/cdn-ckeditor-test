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
  public static get pluginName() {
    return 'CloudServicesCommentsAdapter' as const;
  }

  /**
   * @inheritDoc
   */
  public static get requires() {
    return ['CloudServices'] as const;
  }

  private _cloudServicesToken: string;
  private _cloudServicesUrl: string;
  private _commentsEndpoint: string;
  private _localCache: Map<string, Comment>;

  /**
   * @inheritDoc
   */
  constructor(editor: any) {
    super(editor);
    this._localCache = new Map();
    this._commentsEndpoint = 'comments';
	this._cloudServicesToken = '';
	this._cloudServicesUrl = '';
  }

  /**
   * @inheritDoc
   */
  public async init(): Promise<void> {
    const editor = this.editor;

    try {
      // Get token and URL from config
      const cloudServicesConfig = editor.config.get('cloudServices') as any;
      console.log('Cloud Services Config:', cloudServicesConfig);

      if (!cloudServicesConfig || !cloudServicesConfig.tokenUrl) {
        console.warn('CloudServices not properly configured. Missing tokenUrl.');
        return Promise.resolve();
      }

      this._cloudServicesToken = cloudServicesConfig.tokenUrl;

      // Construct the correct API base URL using your organization and environment IDs
      const organizationId = 'a4d_gi5g05l6';
      const environmentId = '0cGMGt0uxQfN8gFSt-Rk';
      this._cloudServicesUrl = `https://${organizationId}.cke-cs.com/api/v5/${environmentId}`;

      // Set up the comments endpoint with the correct path
      const documentId = cloudServicesConfig.documentId || 'default-document';

      // Ensure the document exists before proceeding
      await this._ensureDocumentExists(documentId);

      this._commentsEndpoint = `${this._cloudServicesUrl}/documents/${documentId}/comments`;

      console.log('CloudServicesCommentsAdapter initialized with:', {
        tokenUrl: this._cloudServicesToken,
        apiUrl: this._cloudServicesUrl,
        endpoint: this._commentsEndpoint
      });

      // Load initial comments
      await this._loadComments();
    } catch (error) {
      console.error('CloudServicesCommentsAdapter initialization error:', error);
    }

    return Promise.resolve();
  }

  /**
   * Fetch helper that adds authorization headers
   */
  private async _fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    // The token URL contains the actual token we need to extract
    const token = this._cloudServicesToken.split('/').pop()?.split('?')[0] || '';

    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };

    return fetch(url, {
      ...options,
      headers
    });
  }

  /**
   * Loads comments from the server into local cache
   */
  private async _loadComments(): Promise<void> {
    try {
      console.log('Loading comments from:', this._commentsEndpoint);
      const response = await this._fetchWithAuth(this._commentsEndpoint);

      if (!response.ok) {
        throw new Error(`Failed to load comments: ${response.statusText}`);
      }

      const comments = await response.json();

      // Clear and repopulate cache
      this._localCache.clear();
      comments.forEach((comment: Comment) => {
        this._localCache.set(comment.id, comment);
      });

      console.log(`Loaded ${comments.length} comments from cloud`);
    } catch (error) {
      console.error('Error loading comments from cloud:', error);
    }
  }

  /**
   * @inheritDoc
   */
  public async addComment(commentData: Partial<Comment>): Promise<Comment> {
    const comment = {
      id: commentData.id || Date.now().toString(),
      content: commentData.content || '',
      authorId: commentData.authorId || '',
      authorName: commentData.authorName || '',
      createdAt: commentData.createdAt || new Date().toISOString()
    } as Comment;

    try {
      const response = await this._fetchWithAuth(this._commentsEndpoint, {
        method: 'POST',
        body: JSON.stringify(comment)
      });

      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.statusText}`);
      }

      const savedComment = await response.json();
      this._localCache.set(savedComment.id, savedComment);
      return savedComment;
    } catch (error) {
      console.error('Error adding comment to cloud:', error);

      // Fallback to local storage
      this._localCache.set(comment.id, comment);
      return comment;
    }
  }

  /**
   * @inheritDoc
   */
  public async updateComment(commentData: Comment): Promise<Comment> {
    try {
      const response = await this._fetchWithAuth(`${this._commentsEndpoint}/${commentData.id}`, {
        method: 'PUT',
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        throw new Error(`Failed to update comment: ${response.statusText}`);
      }

      const updatedComment = await response.json();
      this._localCache.set(updatedComment.id, updatedComment);
      return updatedComment;
    } catch (error) {
      console.error('Error updating comment in cloud:', error);

      // Fallback to local storage
      this._localCache.set(commentData.id, commentData);
      return commentData;
    }
  }

  /**
   * @inheritDoc
   */
  public async removeComment(commentId: string): Promise<void> {
    try {
      const response = await this._fetchWithAuth(`${this._commentsEndpoint}/${commentId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Failed to remove comment: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error removing comment from cloud:', error);
    }

    // Remove from local cache regardless of cloud operation result
    this._localCache.delete(commentId);
    return Promise.resolve();
  }

  /**
   * @inheritDoc
   */
  public async getComment(commentId: string): Promise<Comment> {
    // Try to get from local cache first
    const cachedComment = this._localCache.get(commentId);
    if (cachedComment) {
      return cachedComment;
    }

    // If not in cache, try to fetch from cloud
    try {
      const response = await this._fetchWithAuth(`${this._commentsEndpoint}/${commentId}`);

      if (!response.ok) {
        throw new Error(`Failed to get comment: ${response.statusText}`);
      }

      const comment = await response.json();
      this._localCache.set(comment.id, comment);
      return comment;
    } catch (error) {
      console.error(`Error fetching comment ${commentId} from cloud:`, error);
    }

    // Return a default comment if fetching fails
    return {
      id: commentId,
      content: '',
      authorId: '',
      authorName: 'Unknown User',
      createdAt: new Date().toISOString()
    };
  }

  /**
   * @inheritDoc
   */
  public async getComments(): Promise<Comment[]> {
    try {
      await this._loadComments(); // Refresh from server
    } catch (error) {
      console.error('Error refreshing comments from cloud:', error);
    }

    return Array.from(this._localCache.values());
  }

  /**
   * Creates the document if it doesn't exist yet
   */
  private async _ensureDocumentExists(documentId: string): Promise<void> {
    try {
      // We'll try to create the document directly instead of checking first
      console.log(`Attempting to create document ${documentId}...`);

      // Get the current editor data
      const editorData = this.editor.getData ? this.editor.getData() : '<p>Initial document content</p>';

      // Get editor configuration
      const cloudServicesConfig = this.editor.config.get('cloudServices') as any;
      const bundleVersion = cloudServicesConfig.bundleVersion || 'default-bundle-version';

      // Create the document with the proper structure according to API docs
      const createUrl = `${this._cloudServicesUrl}/documents`;
      const createResponse = await this._fetchWithAuth(createUrl, {
        method: 'POST',
        body: JSON.stringify({
          id: documentId,
          content: {
            bundle_version: bundleVersion,
            data: editorData,
            use_initial_data: true // This allows import without uploaded editor bundle
          },
          // Default empty arrays for other collections
          comments: [],
          suggestions: [],
          threads: []
        })
      });

      if (createResponse.status === 409) {
        // 409 Conflict means the document already exists, which is fine
        console.log(`Document ${documentId} already exists`);
        return;
      } else if (!createResponse.ok) {
        const errorData = await createResponse.json();
        console.error('Document creation error details:', errorData);
        throw new Error(`Failed to create document: ${createResponse.statusText}`);
      }

      console.log(`Document ${documentId} created successfully`);
    } catch (error) {
      console.error('Error ensuring document exists:', error);
      // Don't throw the error - we'll try to continue anyway
      console.warn('Continuing without document creation - comments may not work');
    }
  }
}
