import Posts from "../model/postsModel.js";
import {
  AddPostInput,
  DeletePostInput,
  FindPostInput,
  GetAllPostsInput,
  GetPostInput,
  UpdatePostInput,
} from "../utils/interface/postInterface.js";
import MessageUtils from "../utils/messageUtils.js";

const postService = {
  //creating addpost function and using interface
  addPost: async (attributes: AddPostInput) => {
    const { user_id, image, caption } = attributes;
    try {
      const newPost = await Posts.create({
        user_id,
        image,
        caption,
      });
      return newPost;
    } catch (error: any) {
      throw new Error(MessageUtils.ERROR.ERROR_ADDING_POST + error.message);
    }
  },
  //creating findpost function and using interface
  findPost: async ({ post_id }: FindPostInput) => {
    try {
      const post = await Posts.findByPk(post_id);
      return post;
    } catch (error: any) {
      throw new Error(MessageUtils.ERROR.POST_NOT_FOUND);
    }
  },
  //creating updatepost function and using interface

  updatePost: async (attributes: UpdatePostInput) => {
    const { id, updateData } = attributes;
    const updatedvalue = await Posts.update(updateData, { where: { id } });
    if (updatedvalue) {
      const updatedPost = await Posts.findOne({ where: { id } });
      return updatedPost;
    }
    throw new Error(MessageUtils.ERROR.POST_NOT_UPDATED);
  },
  //creating delete post function and using interface
  deletePost: async (input: DeletePostInput) => {
    const { post_id } = input;
    try {
      const deletePost = await Posts.update(
        { isDelete: true },
        { where: { id: post_id } },
      );
      return deletePost;
    } catch (err: any) {
      throw new err(MessageUtils.ERROR.POST_DELETION_FAILED);
    }
  },
  //creating get all post function and using interface
  getallPost: async (input: GetAllPostsInput) => {
    const { user_id } = input;
    try {
      const posts = await Posts.findAll({
        where: {
          user_id: user_id,
          isDelete: false,
        },
      });
      return posts;
    } catch (error: any) {
      throw new error(MessageUtils.ERROR.POST_FETCH_FAILED);
    }
  },
  //creating get post function and using interface
  getPost: async ({ user_id, post_id }: GetPostInput) => {
    try {
      const post = await Posts.findOne({
        where: {
          user_id: user_id,
          id: post_id,
          isDelete: false,
        },
      });
      return post;
    } catch (error: any) {
      throw new error(MessageUtils.ERROR.POST_NOT_FOUND);
    }
  },
};

export default postService;
