import { Request, Response } from "express";
import { APIResponse } from "../utils/apiResponse.js";
import MessageUtils from "../utils/messageUtils.js";
import HttpStatusCodes from "../utils/statusCode.js";
import postService from "../service/postService.js";
import commentService from "../service/commentService.js";
import likeService from "../service/likeService.js";
import { userService } from "../service/userService.js";
import {
  addLikeSchema,
  getLikesSchema,
} from "../utils/validation/likeValidation.js";
//adding comment with yup validation
const addLike = async (req: Request, res: Response) => {
  try {
    const validatedData = await addLikeSchema.validate(req.body, {
      abortEarly: false,
    });
    const { user_id, post_id, comment_id, likeType, status } = validatedData;
    const isUserExist = await userService.findUser({ userId: user_id });
    if (!isUserExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.USER_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    if (likeType === "Post") {
      if (!post_id) {
        throw new Error(MessageUtils.ERROR.POST_ID_IS_REQUIRED);
      }
      const isPostExist = await postService.findPost({ post_id });
      if (!isPostExist) {
        APIResponse.error(
          res,
          MessageUtils.ERROR.POST_NOT_FOUND,
          HttpStatusCodes.NOT_FOUND,
        );
      }
    } else if (likeType === "Comment") {
      if (!comment_id) {
        throw new Error(MessageUtils.ERROR.COMMENT_ID_IS_REQUIRED);
      }
      const isCommentExist = await commentService.findComment({ comment_id });
      if (!isCommentExist) {
        APIResponse.error(
          res,
          MessageUtils.ERROR.COMMENT_NOT_FOUND,
          HttpStatusCodes.NOT_FOUND,
        );
      }
    }
    const likeTypeLower = likeType.toLowerCase() as "post" | "comment";
    const existingLike = await likeService.findLike({
      user_id,
      post_id,
      comment_id,
      likeType: likeTypeLower,
    });

    if (existingLike) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.ALREADY_LIKED,
        HttpStatusCodes.BAD_REQUEST,
      );
    }

    const liked = await likeService.addLike({
      user_id,
      post_id,
      comment_id,
      likeType: likeTypeLower,
      status: true,
    });
    APIResponse.success(res, {
      status: HttpStatusCodes.CREATED,
      data: liked,
      message: MessageUtils.SUCCESS.LIKE_SUCESS,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//getting like with yup validation
const getLikes = async (req: Request, res: Response) => {
  try {
    await getLikesSchema.validate(req.body);
    const { post_id, comment_id, likeType } = req.body;

    if (likeType !== "Post" && likeType !== "Comment") {
      APIResponse.error(res, "Invalid likeType", HttpStatusCodes.BAD_REQUEST);
    }

    const likes = await likeService.getAlllike({
      post_id: post_id as string,
      comment_id: comment_id as string,
      likeType: (likeType as string).toLowerCase() as "post" | "comment",
    });

    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: likes,
      message: MessageUtils.SUCCESS.LIKE_FETCHED,
    });
  } catch (error: any) {
    APIResponse.error(
      res,
      error.message,
      HttpStatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};

export { addLike, getLikes };
