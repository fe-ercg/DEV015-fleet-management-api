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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const node_test_1 = require("node:test");
// jest.mock("../src/models/taxisModel");
//integridad de datos
(0, node_test_1.describe)("GET /taxis", () => {
    it('should return results that contain the "plate" parameter value', () => __awaiter(void 0, void 0, void 0, function* () {
        const plateValue = 'EF';
        const response = yield (0, supertest_1.default)(app_1.default)
            .get("/taxis")
            .query({ plate: plateValue });
        expect(response.status).toEqual(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach((item) => {
            expect(item.plate).toMatch(plateValue);
        });
    }));
});
