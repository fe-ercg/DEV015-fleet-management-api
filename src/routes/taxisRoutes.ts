import { Router } from "express";
import { getTaxisController } from "../controllers/taxisController";
import { authToken } from "../auth-middleware";

const router = Router();

router.get('/taxis', authToken, getTaxisController);

export default router;