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
exports.getLatestController = exports.getTrajectoriesController = void 0;
const trajectoriesModel_1 = require("../models/trajectoriesModel");
const getTrajectoriesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taxiId, date } = req.query;
    // obtain taxiId
    const taxisId = taxiId ? parseInt(req.query.taxiId, 10) : 0;
    // obtain date
    const dateStr = date ? req.query.date : '';
    const dateReversed = dateStr ? dateStr.split('-').reverse().join('-') : '';
    const isValidDateFormat = (dat) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(dat);
    };
    if (dateReversed && !isValidDateFormat(dateReversed)) {
        return res.status(400).json({ error: "date badly formatted >-<" });
    }
    if (!dateStr) {
        return res.status(400).json({ error: "missing date 7-7" });
    }
    if (!taxisId) {
        return res.status(400).json({ error: "missing taxiId 7-7" });
    }
    try {
        const trajectories = yield (0, trajectoriesModel_1.getTrajectories)(taxisId, dateReversed);
        if (trajectories.length === 0) {
            return res.status(404).json({ error: "taxiId its not found 0w0" });
        }
        const trajectoriesResponse = trajectories.map(response => {
            return {
                taxiId: response.taxi_id,
                plate: response.plate,
                date: response.date,
                latitude: response.latitude,
                longitude: response.longitude
            };
        });
        // res.status(200).json(trajectories);
        res.status(200).json(trajectoriesResponse);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching trajectories ->', error });
    }
    ;
});
exports.getTrajectoriesController = getTrajectoriesController;
//-----------------------------latest trajectories-------------------
const getLatestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latests = yield (0, trajectoriesModel_1.getLatestTrajectories)();
        const latestsResponse = latests.map(response => {
            return {
                taxiId: response.taxi_id,
                plate: response.plate,
                timestamp: response.date,
                latitude: response.latitude,
                longitude: response.longitude
            };
        });
        res.status(200).json(latestsResponse);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching latest trajectories ->', error });
    }
    ;
});
exports.getLatestController = getLatestController;
