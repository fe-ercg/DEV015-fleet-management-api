import { Router } from "express";
import { createUserController } from "../controllers/usersController";

const router = Router();

router.post('/users', createUserController);

export default router;