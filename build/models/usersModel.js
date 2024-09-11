"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const client_1 = __importDefault(require("../client"));
const createUser = (userData) => {
    return client_1.default.users.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
    });
};
exports.createUser = createUser;
