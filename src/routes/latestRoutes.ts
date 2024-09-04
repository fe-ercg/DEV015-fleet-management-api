import { Router } from "express";
import { getLatestController } from "../controllers/latestController";

const router = Router();

router.get('/trajectories/latest', getLatestController);

export default router;