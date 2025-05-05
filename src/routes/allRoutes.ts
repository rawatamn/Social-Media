import { Router } from "express";
import userRoutes from "./userRoutes.js";
import postRoutes from "./postRoutes.js";
import commentRoutes from "./commentRoutes.js";
import likeRoutes from "./likeRoutes.js";
import { allRoutes } from "../utils/indexRoutes.js";
const router = Router();

router.use(allRoutes.USER, userRoutes);
router.use(allRoutes.POST, postRoutes);
router.use(allRoutes.COMMENT, commentRoutes);
router.use(allRoutes.LIKE, likeRoutes);
export default router;
