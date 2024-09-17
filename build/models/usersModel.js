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
exports.deletaAll = exports.deleteUser = exports.patchUsers = exports.getUsers = exports.createUser = void 0;
const client_1 = __importDefault(require("../client"));
//---------------------POST--------------------------
const createUser = (name, email, password) => {
    return client_1.default.users.create({
        data: {
            name,
            email,
            password
        }
    });
};
exports.createUser = createUser;
//-------------------------GET--------------------------------
const getUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.users.findMany({
        skip: (page - 1) * limit,
        take: limit
    });
});
exports.getUsers = getUsers;
// ----------------PATCH-----------------------------------------
const patchUsers = (userId, userEmail, userName) => {
    let searchParams = {};
    if (userId) {
        searchParams.id = userId;
    }
    else if (userEmail) {
        searchParams.email = userEmail;
    }
    else {
        throw new Error('id o email invalidos');
    }
    return client_1.default.users.update({
        where: searchParams,
        data: {
            name: userName
        }
    });
};
exports.patchUsers = patchUsers;
//-------------------------DELETE------------------------------------
const deleteUser = (userId, userEmail) => {
    let searchParams = {};
    if (userId) {
        searchParams.id = userId;
    }
    else if (userEmail) {
        searchParams.email = userEmail;
    }
    else {
        throw new Error('id o email invalidos');
    }
    return client_1.default.users.delete({
        where: searchParams,
    });
};
exports.deleteUser = deleteUser;
///-----------------------DELETE ALL-------------------------
const deletaAll = () => {
    return client_1.default.users.deleteMany();
};
exports.deletaAll = deletaAll;
