"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserController = void 0;
const usersModel_1 = require("../models/usersModel");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'debes llenar todos los datos del usuario' });
        }
        const newUser = yield (0, usersModel_1.createUser)({ name, email, password });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('error 50', error);
        res.status(500).json({ message: 'error al crear un usuario <.<', error });
    }
});
exports.createUserController = createUserController;
