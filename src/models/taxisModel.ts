import prisma from "../client";

export const getTaxis = async (plate: string, page: number, limit: number) => {
    const findPlate = plate ? {plate : {contains: plate} } : {};

    return await prisma.taxis.findMany({
        where: findPlate,
        skip: (page -1) * limit,
        take: limit
    });
}