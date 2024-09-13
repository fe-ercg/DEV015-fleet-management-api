import prisma from "../client";
import { Trajectory } from "../types";

export const getLatest = async () => {

    return await prisma.$queryRaw<Trajectory[]>`
        SELECT DISTINCT ON (trajectories.taxi_id)
            trajectories.taxi_id,
            taxis.plate,
            trajectories.date,
            trajectories.latitude,
            trajectories.longitude
        FROM "taxis"
        JOIN "trajectories" ON taxis.id = trajectories.taxi_id
        WHERE
            trajectories.date = (
                SELECT MAX(trajectories.date)
                FROM trajectories
                WHERE trajectories.taxi_id = taxis.id
            );
    `
}