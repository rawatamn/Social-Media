import { Router } from "express";
import { login, registerUser } from "../controller/userController.js";
import { authRoutes } from "../utils/indexRoutes.js";

const router = Router();

router.post(authRoutes.REGISTER, registerUser);
router.post(authRoutes.LOGIN, login);

export default router;
