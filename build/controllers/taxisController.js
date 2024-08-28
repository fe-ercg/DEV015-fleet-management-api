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
exports.getTaxisController = void 0;
const taxisModel_1 = require("../models/taxisModel");
const getTaxisController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plate, page = 1, limit = 10 } = req.query;
    const plates = plate ? plate.toString() : '';
    const pages = parseInt(page, 10) || 1;
    const limits = parseInt(limit, 10) || 10;
    try {
        const taxis = yield (0, taxisModel_1.getTaxis)(plates, pages, limits);
        res.status(200).json(taxis);
        if (isNaN(pages) || pages < 1) {
            res.status(400).json({ error: "invalid value of page -.-" });
        }
        ;
        if (isNaN(limits) || limits < 1) {
            res.status(400).json({ error: "invalid value of limit -.-" });
        }
        ;
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching taxis ->', error });
    }
    ;
});
exports.getTaxisController = getTaxisController;
