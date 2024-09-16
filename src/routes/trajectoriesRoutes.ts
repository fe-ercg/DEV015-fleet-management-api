import { Router } from "express";
import { getTrajectoriesController, getLatestController } from "../controllers/trajectoriesController"

const router = Router();

router.get('/trajectories', getTrajectoriesController);
router.get('/trajectories/latest', getLatestController);

export default router;