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
exports.getTrajectories = void 0;
const client_1 = __importDefault(require("../client"));
// export const getTrajectories = async (taxiId: number, date: string) => {
const getTrajectories = () => __awaiter(void 0, void 0, void 0, function* () {
    // const findTaxiId = taxiId ? {taxi_id : taxiId } : {};
    // const findDate = date ? {date: {equals: date}} : {};
    //SELECT t FROM Trajectory t WHERE t.taxiId.id = :taxiId AND FUNCTION('DATE', t.date) = :date
    const taxisId = 6418;
    const dateToFilter = '2008-02-02';
    const results = yield client_1.default.$queryRaw `
        SELECT * FROM "trajectories"
        WHERE taxi_id = ${taxisId} AND DATE("date") = ${dateToFilter};
    `;
    return results;
    return yield client_1.default.trajectories.findMany({
    // where: {...findTaxiId, ...findDate}
    // where: {taxi_id: 6418, date: new Date ("2008-02-02 14:22:40")}
    // where: {taxi_id: 6418, date: {
    //     gte: new Date('2008-02-02T00:00:00Z'), // Inicio del día
    //     lt: new Date('2008-02-03T00:00:00Z'), // Inicio del siguiente día
    // }}
    });
});
exports.getTrajectories = getTrajectories;
