import { Router } from "express";
import { createUserController , getUsersController, patchUsersController, deleteUserConstroller, deletaAllController } from "../controllers/usersController";
import { authToken } from "../auth-middleware";

const router = Router();

router.post('/users', authToken, createUserController);
router.get('/users', authToken, getUsersController);
router.patch('/users/:uid', authToken, patchUsersController);
router.delete('/users/all', authToken, deletaAllController);
router.delete('/users/:uid', authToken, deleteUserConstroller);

export default router;