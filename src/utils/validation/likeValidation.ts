import * as yup from "yup";

export const addLikeSchema = yup.object({
  user_id: yup.string().required(),
  likeType: yup.string().oneOf(["Post", "Comment"]).required(),
  post_id: yup.string().when("likeType", {
    is: "Post",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  comment_id: yup.string().when("likeType", {
    is: "Comment",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  status: yup.string().oneOf(["like", "comment"]).required(),
});
export const getLikesSchema = yup.object({
  post_id: yup.string().when("likeType", {
    is: "Post",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  comment_id: yup.string().when("likeType", {
    is: "Comment",
    then: (schema) => schema.required(),
    otherwise: (schema) => schema.notRequired().nullable(),
  }),
  likeType: yup.string().required().oneOf(["Post", "Comment"]),
});
