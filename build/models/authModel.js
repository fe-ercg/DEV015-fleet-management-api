"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValid = exports.findUser = void 0;
const client_1 = __importDefault(require("../client"));
const findUser = (email, password) => {
    return client_1.default.users.findUnique({
        where: { email }
    });
};
exports.findUser = findUser;
const passwordValid = (email, password) => {
    return;
};
exports.passwordValid = passwordValid;
