import { Request, Response } from "express";
import { getLatest } from "../models/latestModel";
import { Trajectory } from "../types";

export const getLatestController = async (req: Request, res: Response) => {
    try {
        const latests: Trajectory[] = await getLatest();

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