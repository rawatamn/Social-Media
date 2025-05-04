export interface AddLikeInput {
  user_id: string;
  post_id?: string | null;
  comment_id?: string | null;
  likeType: "post" | "comment";
  status: boolean;
}
export interface FindLikeInput {
  user_id: string;
  likeType: "post" | "comment";
  post_id?: string;
  comment_id?: string;
}
export interface GetLikesInput {
  post_id?: string;
  comment_id?: string;
  likeType: "post" | "comment";
}
