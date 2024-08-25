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
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("./client"));
const app = (0, express_1.default)();
const PORT = 3001;
//Ruta GET
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plate, page = 1, limit = 10 } = req.query;
    const plates = plate ? plate.toString() : '';
    const pages = parseInt(page, 10) || 1;
    const limits = parseInt(limit, 10) || 10;
    const findPlate = plates ? { plate: { contains: plates } } : {};
    const taxis = yield client_1.default.taxis.findMany({
        where: findPlate,
        skip: (pages - 1) * limits,
        take: limits,
    });
    res.json(taxis);
}));
app.listen(PORT, () => {
    console.log('SERVER IS UP :D ON PORT:', PORT);
});
