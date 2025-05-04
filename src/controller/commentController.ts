import { Request, Response } from "express";
import { APIResponse } from "../utils/apiResponse.js";
import MessageUtils from "../utils/messageUtils.js";
import HttpStatusCodes from "../utils/statusCode.js";
import commentService from "../service/commentService.js";
import postService from "../service/postService.js";
import {
  addCommentSchema,
  deleteCommentSchema,
  getAllCommentSchema,
  updateCommentSchema,
} from "../utils/validation/commentValidation.js";
//adding comment with yup validation
const addComment = async (req: Request, res: Response) => {
  try {
    const { post_id, user_id, comment, parentId } =
      await addCommentSchema.validate(req.body, { abortEarly: false });
    const isPostExist = await postService.findPost({ post_id });
    if (!isPostExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.POST_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const newdata = await commentService.addComment({
      post_id,
      user_id,
      comment,
      parentId,
    });
    APIResponse.success(res, {
      status: HttpStatusCodes.CREATED,
      data: newdata,
      message: MessageUtils.SUCCESS.COMMENT_SUCESS,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//geting all comment with yup validation
const getAllcomment = async (req: Request, res: Response) => {
  try {
    const { post_id } = await getAllCommentSchema.validate(req.body, {
      abortEarly: false,
    });

    const isPostExist = await postService.findPost({ post_id });
    if (!isPostExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.POST_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const allComment = await commentService.getAllcomment({ post_id });
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { allComment },
      message: MessageUtils.SUCCESS.COMMENT_FETCH,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//deleting comment using validation
const deletedsComment = async (req: Request, res: Response) => {
  const { comment_id } = await deleteCommentSchema.validate(req.body, {
    abortEarly: false,
  });
  try {
    const iscommenentExist = await commentService.findComment({ comment_id });
    if (!iscommenentExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.POST_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const deletedComment = await commentService.deleteComment(comment_id);
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { deletedComment },
      message: MessageUtils.SUCCESS.COMMENT_DELETED,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//updating comment using validation
const updatedComment = async (req: Request, res: Response) => {
  try {
    const validatedData = await updateCommentSchema.validate(req.body, {
      abortEarly: false,
    });
    const { comment_id, ...updatefields } = validatedData;
    const iscommenentExist = await commentService.findComment({ comment_id });
    if (!iscommenentExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.COMMENT_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const newComment = await commentService.updateComment({
      id: comment_id,
      updateData: updatefields,
    });
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { newComment },
      message: MessageUtils.SUCCESS.COMMENT_UPDATED,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
export { addComment, getAllcomment, deletedsComment, updatedComment };
