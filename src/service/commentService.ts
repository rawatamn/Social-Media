import Comments from "../model/commentsModel.js";
import {
  AddCommentInput,
  FindCommentInput,
  GetAllCommentsInput,
  UpdateCommentInput,
} from "../utils/interface/commentInterface.js";
import MessageUtils from "../utils/messageUtils.js";

const commentService = {
  //creating find comment function and using interface
  findComment: async ({ comment_id }: FindCommentInput) => {
    try {
      const comment = await Comments.findByPk(comment_id);
      return comment;
    } catch (error: any) {
      throw new Error(MessageUtils.ERROR.COMMENT_NOT_FOUND);
    }
  },
  //creating addcomment function and using interface
  addComment: async ({
    post_id,
    user_id,
    comment,
    parentId,
  }: AddCommentInput) => {
    try {
      if (parentId) {
        const parentComment = await Comments.findOne({
          where: { id: parentId },
        });
        if (!parentComment) {
          throw new Error(MessageUtils.ERROR.PARENT_COMMENT_NOT_FOUND);
        }
      }

      const newComment = await Comments.create({
        post_id,
        user_id,
        comment,
        parentId: parentId || null,
      });

      return newComment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
  //creating getallcomment function and using interface
  getAllcomment: async ({ post_id }: GetAllCommentsInput) => {
    try {
      const comments = await Comments.findAll({
        where: {
          post_id: post_id,
          isDelete: false,
        },
      });
      return comments;
    } catch (error: any) {
      throw new error(MessageUtils.ERROR.COMMENT_FETCH_FAILED);
    }
  },
  //creating deletecomment function and using interface
  deleteComment: async (comment_id: string) => {
    try {
      const deletedComment = await Comments.update(
        { isDelete: true },
        { where: { id: comment_id } },
      );
      return deletedComment;
    } catch (err: any) {
      throw new Error(MessageUtils.ERROR.COMMENT_DELETION_FAILED);
    }
  },
  //creating updatecomment function and using interface
  updateComment: async (attributes: UpdateCommentInput) => {
    const { id, updateData } = attributes;
    try {
      const updatedComment = await Comments.update(updateData, {
        where: { id },
      });
      if (updatedComment) {
        const newComment = await Comments.findOne({ where: { id: id } });
        return newComment;
      }
    } catch (err: any) {
      throw new Error(MessageUtils.ERROR.COMMENT_UPDATION_FAILED);
    }
  },
};
export default commentService;
