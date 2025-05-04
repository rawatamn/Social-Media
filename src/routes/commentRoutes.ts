import { Router } from "express";
import {
  addComment,
  deletedsComment,
  getAllcomment,
  updatedComment,
} from "../controller/commentController.js";
const router = Router();
router.post("/add", addComment);
router.get("/getall", getAllcomment);
router.patch("/update", updatedComment);
router.delete("/delete", deletedsComment);
export default router;
