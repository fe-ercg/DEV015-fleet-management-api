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
//-------------------------GET--------------------------------
export const getUsers = async (page: number, limit: number) => {
    return await prisma.users.findMany({
        skip: (page-1)*limit,
        take: limit
    })
}

// ----------------PATCH-----------------------------------------
export const patchUsers = (userId: number | null, userEmail: string | null, userName: string) => {

    let searchParams: { id?: number, email?: string } = {};
    
    if(userId){
        searchParams.id = userId;
    } else if ( userEmail ){
        searchParams.email = userEmail;
    } else {
        throw new Error('id o email invalidos')
    }

    return prisma.users.update({
        where: searchParams as {id: number} | {email: string},
        data: {
            name: userName
        }
    })
}

//-------------------------DELETE------------------------------------
export const deleteUser = (userId: number | null, userEmail: string | null) => {
    let searchParams: { id?: number, email?: string } = {};
    
    if(userId){
        searchParams.id = userId;
    } else if ( userEmail ){
        searchParams.email = userEmail;
    } else {
        throw new Error('id o email invalidos')
    }
    
    return prisma.users.delete({
        where: searchParams as {id: number} | {email: string},
    })
}