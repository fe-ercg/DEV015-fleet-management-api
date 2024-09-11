import { Router } from "express";
import { createUserController , getUsersController } from "../controllers/usersController";

const router = Router();

router.post('/users', createUserController);
router.get('/users', getUsersController)

export default router;