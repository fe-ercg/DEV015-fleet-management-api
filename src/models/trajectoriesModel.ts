import prisma from "../client";
import { Trajectory } from "../types";

export const getTrajectories = async (taxiId: number, date: string) => {
    const findTaxi = taxiId;
    const findDate = date;

    const results = await prisma.$queryRaw<Trajectory[]>`
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
}