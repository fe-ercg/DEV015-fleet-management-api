"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxisRoutes_1 = __importDefault(require("./routes/taxisRoutes"));
const app = (0, express_1.default)();
app.use(taxisRoutes_1.default);
//Ruta GET
// app.get('/taxis', async (req: Request, res: Response) => {
//     const { plate, page =1, limit =10 } = req.query;
//     const plates = plate ? plate.toString() : '';
//     const pages = parseInt(page as string, 10) || 1;
//     const limits = parseInt(limit as string, 10) || 10;
//     const findPlate = plates ? {plate : {contains: plates} } : {};
//     const taxis = await prisma.taxis.findMany({
//         // where: {plate: {contains: '12'}},
//         where: findPlate,
//         skip: (pages -1) * limits,
//         take: limits,
//     })
//     res.json(taxis)
// })
exports.default = app;
