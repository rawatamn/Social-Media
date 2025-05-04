import { Router } from "express";
import { addLike, getLikes } from "../controller/likeController.js";

const router = Router();
router.post("/add", addLike);
router.get("/get", getLikes);
export default router;
