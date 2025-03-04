export interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  [key: string]: any;
}

export interface CommentsIntegrationInterface {
  init(): Promise<void>;
  addComment(commentData: Partial<Comment>): Promise<Comment>;
  updateComment(commentData: Comment): Promise<Comment>;
  removeComment(commentId: string): Promise<void>;
  getComment(commentId: string): Promise<Comment>;
  getComments(): Promise<Comment[]>;
}
