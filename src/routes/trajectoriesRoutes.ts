import { Router } from "express";
import { getTrajectoriesController } from "../controllers/trajectoriesController"

const router = Router();

router.get('/trajectories', getTrajectoriesController);

export default router;