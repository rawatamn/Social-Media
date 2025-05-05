import { Request, Response } from "express";
import postService from "../service/postService.js";
import { APIResponse } from "../utils/apiResponse.js";
import MessageUtils from "../utils/messageUtils.js";
import HttpStatusCodes from "../utils/statusCode.js";
import {
  deletePostSchema,
  getAllPostsSchema,
  getSinglePostSchema,
  postschema,
  updatePostSchema,
} from "../utils/validation/postValidation.js";
import { userService } from "../service/userService.js";
//creating a post
const addpost = async (req: Request, res: Response) => {
  //destructring from request
  const { user_id, image, caption } = req.body;

  try {
    await postschema.validate(req.body);
    const isUserExist = await userService.findUser({ userId: user_id });
    //checking user exist or not
    if (!isUserExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.USER_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const newdata = await postService.addPost({
      user_id: user_id,
      image: image,
      caption: caption,
    });
    APIResponse.success(res, {
      status: HttpStatusCodes.CREATED,
      data: newdata,
      message: MessageUtils.SUCCESS.POST_SUCESS,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//creating update post function
const updatepost = async (req: Request, res: Response) => {
  try {
    //validating the data
    const validatedData = await updatePostSchema.validate(
      { id: req.body.post_id, updateData: req.body },
      { abortEarly: false },
    );

    //checking post exist or not
    const isPostExist = await postService.findPost({
      post_id: validatedData.id,
    });
    if (!isPostExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.POST_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }

    //validating the post
    const updatedPost = await postService.updatePost(validatedData);

    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { updatedPost },
      message: MessageUtils.SUCCESS.POST_UPDATED,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//creating delete post function
const deletepost = async (req: Request, res: Response) => {
  //validating the data
  const validatedData = await deletePostSchema.validate(req.body, {
    abortEarly: false,
  });

  try {
    const isPostExist = await postService.findPost({
      post_id: validatedData.post_id,
    });
    //checking post exist or not
    if (!isPostExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.POST_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const deletedPost = await postService.deletePost(validatedData);
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { deletedPost },
      message: MessageUtils.SUCCESS.DELETE_UPDATED,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//creating get all post function
const getallPost = async (req: Request, res: Response) => {
  //destructring user id and validating it
  const { user_id } = await getAllPostsSchema.validate(req.body, {
    abortEarly: false,
  });
  try {
    const isUserExist = await userService.findUser({ userId: user_id });
    //checking user exist or not
    if (!isUserExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.USER_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const allposts = await postService.getallPost({ user_id });
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { allposts },
      message: MessageUtils.SUCCESS.Post_FETCHED,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
//creating function for single post
const getSinglepost = async (req: Request, res: Response) => {
  const { user_id, post_id } = await getSinglePostSchema.validate(req.body, {
    abortEarly: false,
  });
  try {
    //checking user exist or not
    const isUserExist = await userService.findUser({ userId: user_id });
    if (!isUserExist) {
      APIResponse.error(
        res,
        MessageUtils.ERROR.USER_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND,
      );
    }
    const singlePost = await postService.getPost({ user_id, post_id });
    APIResponse.success(res, {
      status: HttpStatusCodes.OK,
      data: { singlePost },
      message: MessageUtils.SUCCESS.Post_Fetch,
    });
  } catch (err: any) {
    APIResponse.error(res, err.message, HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
};
export { addpost, updatepost, deletepost, getallPost, getSinglepost };
