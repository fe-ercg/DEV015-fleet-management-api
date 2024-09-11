"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const router = (0, express_1.Router)();
router.post('/users', usersController_1.createUserController);
router.get('users', usersController_1.getUsersController);
exports.default = router;
