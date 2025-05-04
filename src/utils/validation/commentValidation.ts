import * as yup from "yup";

export const addCommentSchema = yup.object({
  post_id: yup.string().required(),
  user_id: yup.string().required(),
  comment: yup.string().required(),
  parentId: yup.string().nullable(),
});
export const getAllCommentSchema = yup.object().shape({
  post_id: yup.string().required(),
});

export const deleteCommentSchema = yup.object().shape({
  comment_id: yup.string().required(),
});
export const updateCommentSchema = yup.object({
  comment_id: yup.string().required(),
  comment: yup.string().required(),
});
