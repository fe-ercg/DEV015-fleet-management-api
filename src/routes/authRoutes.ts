import { Router } from "express";
import { authUserController } from "../controllers/authController";

const router = Router();

router.post('/auth/login', authUserController)

export default router