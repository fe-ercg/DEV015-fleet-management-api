"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const latestController_1 = require("../controllers/latestController");
const router = (0, express_1.Router)();
router.get('/latest', latestController_1.getLatestController);
exports.default = router;
