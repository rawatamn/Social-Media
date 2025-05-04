import Likes from "../model/likesModel.js";
import {
  AddLikeInput,
  FindLikeInput,
  GetLikesInput,
} from "../utils/interface/likeInterface.js";
import MessageUtils from "../utils/messageUtils.js";
const likeService = {
  //creating addlike function and using interface
  addLike: async (attributes: AddLikeInput) => {
    const { user_id, post_id, comment_id, likeType, status } = attributes;
    try {
      const newLike = await Likes.create({
        user_id,
        post_id,
        comment_id,
        likeType,
        status,
      });
      return newLike;
    } catch (error: any) {
      console.error("Error adding like:", error.message);
      throw new Error(error.message);
    }
  },
  //creating findlike function and using interface
  findLike: async (attributes: FindLikeInput) => {
    try {
      const { user_id, post_id, comment_id, likeType } = attributes;

      const condition = {
        user_id,
        likeType,
        ...(likeType === "post" ? { post_id } : { comment_id }),
      };

      const existingLike = await Likes.findOne({ where: condition });

      return existingLike;
    } catch (error) {
      console.error(MessageUtils.ERROR.ERROR_FINDING_LIKE, error);
    }
  },
  //creating getalllike function and using interface
  getAlllike: async (attributes: GetLikesInput) => {
    try {
      const { post_id, comment_id, likeType } = attributes;
      const condition = {
        likeType,
        ...(likeType === "post" ? { post_id } : { comment_id }),
      };
      const likes = await Likes.findAll({ where: condition });
      return likes;
    } catch (error) {
      console.error(MessageUtils.ERROR.FETCHING_PROBLEM_ERROR, error);
    }
  },
};
export default likeService;
