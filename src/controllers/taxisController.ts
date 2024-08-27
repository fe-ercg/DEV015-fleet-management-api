import { Request, Response } from "express";
import { getTaxis } from "../models/taxisModel";

export const getTaxisController = async (req: Request, res: Response) => {
    const { plate, page =1, limit =10 } = req.query;

    const plates = plate ? plate.toString() : '';
    const pages = parseInt(page as string, 10) || 1;
    const limits = parseInt(limit as string, 10) || 10;

    try {
        const taxis = await getTaxis(plates, pages, limits);
        res.status(200).json(taxis);
    } catch (error){
        res.status(500).json({message: 'Error fetching taxis ->', error})
    };
}