export interface UpdatePostInput {
  id: string;
  updateData: {
    image?: string;
    caption?: string;
  };
}
export interface DeletePostInput {
  post_id: string;
}
export interface GetAllPostsInput {
  user_id: string;
}
export interface AddPostInput {
  user_id: string;
  image: string;
  caption: string;
}
export interface GetPostInput {
  user_id: string;
  post_id: string;
}
export interface FindPostInput {
  post_id: string;
}
