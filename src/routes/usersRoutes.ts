import { Router } from "express";
import { createUserController , getUsersController, patchUsersController } from "../controllers/usersController";

const router = Router();

router.post('/users', createUserController);
router.get('/users', getUsersController);
router.patch('/users/:uid', patchUsersController)

export default router;