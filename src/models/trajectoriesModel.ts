import prisma from "../client";

export const getTrajectories = async (taxiId: number, date: string) => {
    const findDate = date;

    // const taxisId = 6418;
    // const dateToFilter = '2008-02-02';

    const results = await prisma.$queryRaw`
        SELECT * FROM "trajectories"
        WHERE taxi_id = ${taxiId} AND DATE("date") = ${new Date(findDate)};
    `;

    return results;   
}