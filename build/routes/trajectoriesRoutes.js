"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trajectoriesController_1 = require("../controllers/trajectoriesController");
const router = (0, express_1.Router)();
router.get('/trajectories', trajectoriesController_1.getTrajectoriesController);
exports.default = router;
