import { skip } from "node:test";
import prisma from "../client";
import { CreateUser } from "../types";

export const createUser = (userData: CreateUser) => {
    return prisma.users.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
    })
}

export const getUsers = async (page: number, limit: number) => {
    return await prisma.users.findMany({
        skip: (page-1)*limit,
        take: limit
    })
}

export const patchUsers = (userId: number, userEmail: string, userName: string) => {
    const searchParams = userId ? {id: userId} : { email: userEmail};


    return prisma.users.update({
        where: searchParams,
        data: {
            name: userName
        }
    })
}