import { Router } from "express";
import { authToken } from "../auth-middleware";
import { getTrajectoriesController, getLatestController } from "../controllers/trajectoriesController"

const router = Router();

// router.get('/trajectories', getTrajectoriesController);

router.get('/trajectories', authToken, getTrajectoriesController);
router.get('/trajectories/latest', authToken, getLatestController);

export default router;