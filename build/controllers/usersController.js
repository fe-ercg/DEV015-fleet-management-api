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
exports.deletaAllController = exports.deleteUserConstroller = exports.patchUsersController = exports.getUsersController = exports.createUserController = void 0;
const usersModel_1 = require("../models/usersModel");
const client_1 = __importDefault(require("../client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//-------------------------------POST-------------------------------------------
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const crypPassword = yield bcrypt_1.default.hash(password, 10);
        if (!name && !email && !password) {
            return res.status(400).json({ error: 'debes llenar todos los datos del usuario' });
        }
        const emailValidation = yield client_1.default.users.findUnique({
            where: {
                email: email
            }
        });
        if (emailValidation) {
            return res.status(409).json({ error: 'ya hay un usuario con el mismo email' });
        }
        const newUser = yield (0, usersModel_1.createUser)(name, email, crypPassword);
        const newUserResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };
        res.status(201).json(newUserResponse);
    }
    catch (e) {
        res.status(500).json({ error: 'error al crear un usuario <.<', e });
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
        const getUsersResponse = users.map(response => {
            return {
                id: response.id,
                name: response.name,
                email: response.email
            };
        });
        res.status(200).json(getUsersResponse);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching users ->', error });
    }
    ;
});
exports.getUsersController = getUsersController;
//-------------------------PATCH-----------------------------------
const patchUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { uid } = req.params;
        if (!name || !uid) {
            return res.status(400).json({ error: 'no hay ningun nombre para cambiar' });
        }
        let userIdCheck = null;
        let userEmailCheck = null;
        if (!isNaN(Number(uid))) {
            userIdCheck = parseInt(uid, 10);
        }
        else {
            userEmailCheck = uid;
        }
        const patchUser = yield (0, usersModel_1.patchUsers)(userIdCheck, userEmailCheck, name);
        const patchUserResponse = {
            id: patchUser.id,
            name: patchUser.name,
            email: patchUser.email
        };
        res.status(200).json(patchUserResponse);
    }
    catch (error) {
        res.status(404).json({ error: 'no se pudo actualizar al usuario' });
    }
});
exports.patchUsersController = patchUsersController;
//----------------------DELETE--------------------------------------
const deleteUserConstroller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.params;
        if (!uid) {
            return res.status(400).json({ error: 'no hay ningun nombre para cambiar' });
        }
        let userIdCheck = null;
        let userEmailCheck = null;
        if (!isNaN(Number(uid))) {
            userIdCheck = parseInt(uid, 10);
        }
        else {
            userEmailCheck = uid;
        }
        const deletUsers = yield (0, usersModel_1.deleteUser)(userIdCheck, userEmailCheck);
        const deletUsersResponse = {
            id: deletUsers.id,
            name: deletUsers.name,
            email: deletUsers.email
        };
        res.status(200).json(deletUsersResponse);
    }
    catch (error) {
        res.status(404).json({ error: 'no se pudo borrar al usuario' });
    }
});
exports.deleteUserConstroller = deleteUserConstroller;
//---------------------------------DELETE ALL----------------------------------
const deletaAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, usersModel_1.deletaAll)();
    res.status(204).json();
});
exports.deletaAllController = deletaAllController;
