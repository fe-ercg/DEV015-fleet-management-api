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
// app.use('/', (req: Request, res: Response): void => {
//     res.send('Hi multiverse');
// });
//Ruta GET
app.get('/taxis', (req, res) => {
    const taxis = [
        { id: 123, plate: 'holaa' },
        { id: 345, plate: 'apoio' },
        { id: 566, plate: 'guasa' }
    ];
    res.json(taxis);
});
app.listen(PORT, () => {
    console.log('SERVER IS UP :D ON PORT:', PORT);
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const allUsers = yield client_1.default;
    });
}
main();
