import { Router } from "express";
import {
  addComment,
  deletedsComment,
  getAllcomment,
  updatedComment,
} from "../controller/commentController.js";
import { commentRoutes } from "../utils/indexRoutes.js";
const router = Router();
router.post(commentRoutes.CREATE, addComment);
router.get(commentRoutes.GETALL, getAllcomment);
router.patch(commentRoutes.UPDATE, updatedComment);
router.delete(commentRoutes.DELETE, deletedsComment);
export default router;
