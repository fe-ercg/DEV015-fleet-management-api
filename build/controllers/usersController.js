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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersController = exports.createUserController = void 0;
const usersModel_1 = require("../models/usersModel");
const client_1 = __importDefault(require("../client"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'debes llenar todos los datos del usuario' });
        }
        const emailValidation = yield client_1.default.users.findUnique({
            where: {
                email: email
            }
        });
        if (emailValidation) {
            return res.status(409).json({ message: 'ya hay un usuario con el mismo email' });
        }
        const newUser = yield (0, usersModel_1.createUser)({ name, email, password });
        const newUserResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        res.status(201).json(newUserResponse);
    }
    catch (error) {
        console.error('error 50', error);
        res.status(500).json({ message: 'error al crear un usuario <.<', error });
    }
});
exports.createUserController = createUserController;
//----------------GET-------------------------------------------
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, limit = 10 } = req.query;
    const pages = parseInt(page, 10);
    const limits = parseInt(limit, 10);
    if (isNaN(pages) || pages < 1) {
        return res.status(400).json({ error: "invalid value of page -.-" });
    }
    ;
    if (isNaN(limits) || limits < 1) {
        return res.status(400).json({ error: "invalid value of limit -.-" });
    }
    ;
    try {
        const users = yield (0, usersModel_1.getUsers)(pages, limits);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users ->', error });
    }
    ;
});
exports.getUsersController = getUsersController;
