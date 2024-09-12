"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxisRoutes_1 = __importDefault(require("./routes/taxisRoutes"));
const trajectoriesRoutes_1 = __importDefault(require("./routes/trajectoriesRoutes"));
const latestRoutes_1 = __importDefault(require("./routes/latestRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(taxisRoutes_1.default);
app.use(trajectoriesRoutes_1.default);
app.use(latestRoutes_1.default);
app.use(usersRoutes_1.default);
exports.default = app;
