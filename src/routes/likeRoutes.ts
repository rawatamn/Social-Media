import { Router } from "express";
import { addLike, getLikes } from "../controller/likeController.js";
import { likeRoutes } from "../utils/indexRoutes.js";

const router = Router();
router.post(likeRoutes.CREATE, addLike);
router.get(likeRoutes.GETALL, getLikes);
export default router;
