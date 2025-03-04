import { Plugin } from 'ckeditor5';
import type { CommentsIntegrationInterface, Comment } from './CommentsIntegrationInterface.js';

/**
 * A plugin that implements the comments adapter integration.
 */
export default class CommentsIntegration extends Plugin implements CommentsIntegrationInterface {
  /**
   * @inheritDoc
   */
  public static get pluginName() {
    return 'CommentsIntegration' as const;
  }

  /**
   * @inheritDoc
   */
  public static get requires() {
    return ['RooleComments'] as const;
  }

  private _comments: Map<string, Comment>;

  /**
   * @inheritDoc
   */
  constructor(editor: any) {
    super(editor);
    this._comments = new Map();
  }

  /**
   * @inheritDoc
   */
  public init(): Promise<void> {
    return Promise.resolve();
  }

  /**
   * @inheritDoc
   */
  public addComment(commentData: Partial<Comment>): Promise<Comment> {
    const comment = {
      ...commentData,
      id: commentData.id || Date.now().toString(),
      content: commentData.content || '',
      authorId: commentData.authorId || '1',
      authorName: commentData.authorName || 'Test User',
      createdAt: commentData.createdAt || new Date().toISOString()
    } as Comment;

    this._comments.set(comment.id, comment);
    return Promise.resolve(comment);
  }

  /**
   * @inheritDoc
   */
  public updateComment(commentData: Comment): Promise<Comment> {
    this._comments.set(commentData.id, commentData);
    return Promise.resolve(commentData);
  }

  /**
   * @inheritDoc
   */
  public removeComment(commentId: string): Promise<void> {
    this._comments.delete(commentId);
    return Promise.resolve();
  }

  /**
   * @inheritDoc
   */
  public getComment(commentId: string): Promise<Comment> {
    const comment = this._comments.get(commentId);
    if (!comment) {
      return Promise.resolve({
        id: commentId,
        content: '',
        authorId: '1',
        authorName: 'Test User',
        createdAt: new Date().toISOString()
      });
    }
    return Promise.resolve(comment);
  }

  /**
   * @inheritDoc
   */
  public getComments(): Promise<Comment[]> {
    return Promise.resolve(Array.from(this._comments.values()));
  }
}
