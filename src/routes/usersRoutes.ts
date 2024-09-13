import { Router } from "express";
import { createUserController , getUsersController, patchUsersController, deleteUserConstroller, deletaAllController } from "../controllers/usersController";

const router = Router();

router.post('/users', createUserController);
router.get('/users', getUsersController);
router.patch('/users/:uid', patchUsersController);
router.delete('/users/all', deletaAllController);
router.delete('/users/:uid', deleteUserConstroller);

export default router;