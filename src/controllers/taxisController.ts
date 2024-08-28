import { Request, Response } from "express";
import { getTaxis } from "../models/taxisModel";

export const getTaxisController = async (req: Request, res: Response) => {
    const { plate, page =1, limit =10 } = req.query;

    const plates = plate ? plate.toString() : '';
    const pages = parseInt(page as string, 10);
    const limits = parseInt(limit as string, 10);

    if(isNaN(pages) || pages < 1 ) {
        return res.status(400).json({ error : "invalid value of page -.-" })
    };
    if(isNaN(limits) || limits < 1 ) {
        return res.status(400).json({ error : "invalid value of limit -.-" })
    };

    try {
        const taxis = await getTaxis(plates, pages, limits);
        res.status(200).json(taxis);
    } catch (error){
        res.status(500).json({message: 'Error fetching taxis ->', error})
    };
}