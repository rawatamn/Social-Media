import { Router } from "express";
import {
  addpost,
  deletepost,
  getallPost,
  getSinglepost,
  updatepost,
} from "../controller/postController.js";
import { postRoutes } from "../utils/indexRoutes.js";
const router = Router();
router.post(postRoutes.CREATE, addpost);
router.patch(postRoutes.UPDATE, updatepost);
router.delete(postRoutes.DELETE, deletepost);
router.get(postRoutes.GETALL, getallPost);
router.get(postRoutes.GETSINGLE, getSinglepost);
export default router;
