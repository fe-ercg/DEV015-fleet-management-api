import prisma from "../client";

export const createUsers = (data) => {
    return prisma.users.create({
        
    })
}