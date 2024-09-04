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
exports.getLatestController = void 0;
const latestModel_1 = require("../models/latestModel");
const getLatestController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const latests = yield (0, latestModel_1.getLatest)();
        const latestsResponse = latests.map(response => {
            return {
                taxiId: response.taxi_id,
                plate: response.plate,
                date: response.date,
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
