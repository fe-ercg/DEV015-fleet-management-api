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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTrajectoriesController = void 0;
const trajectoriesModel_1 = require("../models/trajectoriesModel");
const getTrajectoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const taxisId = parseInt(req.query.taxiId as string, 10);
    // const dateStr = req.query.date as string;
    // const [ day, month, year ] = dateStr.split('-').map(Number);
    // const [ day, month, year ] = dateStr.split('-').map(n => parseInt(n, 10));
    // const dateReversed = [ year, month, day].join('-');
    // const dateReversed = new Date (dateStr.split('-').reverse().join('-'));
    try {
        // const trajectories = await getTrajectories(taxisId, dateReversed);
        const trajectories = yield (0, trajectoriesModel_1.getTrajectories)();
        res.status(200).json(trajectories);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching trajectories ->', error });
    }
    ;
});
exports.getTrajectoriesController = getTrajectoriesController;
