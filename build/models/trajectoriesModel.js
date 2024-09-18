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
exports.getLatestTrajectories = exports.getTrajectories = void 0;
const client_1 = __importDefault(require("../client"));
const getTrajectories = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const findTaxi = taxiId;
    const findDate = date;
    const results = yield client_1.default.$queryRaw `
        SELECT 
            trajectories.taxi_id,
            taxis.plate,
            trajectories.date,
            trajectories.latitude,
            trajectories.longitude
        FROM "trajectories"
        JOIN "taxis" ON trajectories.taxi_id = taxis.id
        WHERE taxi_id = ${findTaxi} AND DATE("date") = ${new Date(findDate)};
    `;
    return results;
});
exports.getTrajectories = getTrajectories;
//--------------------Latest--------------------------------------
const getLatestTrajectories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield client_1.default.$queryRaw `
        SELECT DISTINCT ON (trajectories.taxi_id)
            trajectories.taxi_id,
            taxis.plate,
            trajectories.date,
            trajectories.latitude,
            trajectories.longitude
        FROM "taxis"
        JOIN "trajectories" ON taxis.id = trajectories.taxi_id
        WHERE
            trajectories.date = (
                SELECT MAX(trajectories.date)
                FROM trajectories
                WHERE trajectories.taxi_id = taxis.id
            );
    `;
});
exports.getLatestTrajectories = getLatestTrajectories;
