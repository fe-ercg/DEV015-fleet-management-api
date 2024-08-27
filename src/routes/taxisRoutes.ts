import { Router } from "express";
import { getTaxisController } from "../controllers/taxisController";

const router = Router();

router.get('/taxis', getTaxisController);

export default router;