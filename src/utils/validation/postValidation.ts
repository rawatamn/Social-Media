import yup from "yup";
const postschema = yup.object({
  user_id: yup.string().required(),
  image: yup.string().required(),
  caption: yup.string().required(),
});

const updatePostSchema = yup.object({
  id: yup.string().required(),
  updateData: yup.object({
    image: yup.string().optional(),
    caption: yup.string().optional(),
  }),
});

const deletePostSchema = yup.object({
  post_id: yup.string().required("post_id is required"),
});
const getAllPostsSchema = yup.object({
  user_id: yup.string().required("User ID is required"),
});

const getSinglePostSchema = yup.object({
  user_id: yup.string().required("User ID is required"),
  post_id: yup.string().required("Post ID is required"),
});

export {
  postschema,
  updatePostSchema,
  deletePostSchema,
  getAllPostsSchema,
  getSinglePostSchema,
};
