import { Request, Response } from "express";
import { getTrajectories, getLatestTrajectories } from "../models/trajectoriesModel";
import { Trajectory } from "../types";

export const getTrajectoriesController = async (req: Request, res: Response) => {
    const {taxiId, date} = req.query;
    
    // obtain taxiId
    const taxisId = taxiId ? parseInt(req.query.taxiId as string, 10): 0;
    
    // obtain date
    const dateStr = date ? req.query.date as string : '';
    const dateReversed = dateStr ? dateStr.split('-').reverse().join('-') : '';
    const isValidDateFormat = (dat: string) => {
        return /^\d{4}-\d{2}-\d{2}$/.test(dat);
    };

    if(dateReversed && !isValidDateFormat(dateReversed)){
        return res.status(400).json({error: "date badly formatted >-<"})
    }

    if(!dateStr){
        return res.status(400).json({error: "missing date 7-7"})
    }

    if(!taxisId){
        return res.status(400).json({error: "missing taxiId 7-7"})
    }
    
    try {
        const trajectories: Trajectory[] = await getTrajectories(taxisId, dateStr);
        
        if(trajectories.length === 0){
            return res.status(404).json({error: "taxiId its not found 0w0"})
        }

        const trajectoriesResponse = trajectories.map(response => {
            return {
                taxiId: response.taxi_id,
                plate: response.plate,
                date: response.date,
                latitude: response.latitude,
                longitude: response.longitude
            }
        })
        // res.status(200).json(trajectories);
        res.status(200).json(trajectoriesResponse);
    } catch (error){
        res.status(500).json({message: 'Error fetching trajectories ->', error})
    };
}

//-----------------------------latest trajectories-------------------
export const getLatestController = async (req: Request, res: Response) => {
    try {
        const latests: Trajectory[] = await getLatestTrajectories();

        const latestsResponse = latests.map(response => {
            return {
                taxiId: response.taxi_id,
                plate: response.plate,
                timestamp: response.date,
                latitude: response.latitude,
                longitude: response.longitude
            }
        })
        res.status(200).json(latestsResponse)
    } catch (error) {
        res.status(500).json({message: 'Error fetching latest trajectories ->', error})
    };
}