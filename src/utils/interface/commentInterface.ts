export interface FindCommentInput {
  comment_id: string;
}
export interface AddCommentInput {
  post_id: string;
  user_id: string;
  comment: string;
  parentId?: string | null;
}
export interface GetAllCommentsInput {
  post_id: string;
}
export interface UpdateCommentInput {
  id: string;
  updateData: {
    comment?: string;
  };
}
