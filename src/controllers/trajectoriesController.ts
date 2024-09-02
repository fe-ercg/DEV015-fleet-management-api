import { Request, Response } from "express";
import { getTrajectories } from "../models/trajectoriesModel";

export const getTrajectoriesController = async (req: Request, res: Response) => {

    // const {taxiId , date} = req.query;
    const taxisId = parseInt(req.query.taxiId as string, 10);
    const dateStr = req.query.date as string;
    const dateReversed = dateStr.split('-').reverse().join('-');

    try {
        const trajectories = await getTrajectories(taxisId, dateReversed);
        res.status(200).json(trajectories);
    } catch (error){
        res.status(500).json({message: 'Error fetching trajectories ->', error})
    };
}