import prisma from "../client";

export const findUser = (email: string, password: string ) => {
    return prisma.users.findUnique({
        where: { email }
    })
}