"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxisController_1 = require("../controllers/taxisController");
const router = (0, express_1.Router)();
router.get('/taxis', taxisController_1.getTaxisController);
exports.default = router;
