import { Router } from "express";
import {
  addpost,
  deletepost,
  getallPost,
  getSinglepost,
  updatepost,
} from "../controller/postController.js";
const router = Router();
router.post("/create", addpost);
router.patch("/update", updatepost);
router.delete("/delete", deletepost);
router.get("/getAll", getallPost);
router.get("/getsingle", getSinglepost);
export default router;
