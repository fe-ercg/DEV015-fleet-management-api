import { Request, Response } from "express";
import { createUser, getUsers, patchUsers } from "../models/usersModel";
import prisma from "../client";
import { error } from "console";

export const createUserController = async ( req: Request, res: Response ) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: 'debes llenar todos los datos del usuario'})
        }

        const emailValidation = await prisma.users.findUnique({
            where:{
                email: email
            }
        })
        if(emailValidation) {
            return res.status(409).json({message: 'ya hay un usuario con el mismo email'})
        }

        const newUser = await createUser({name, email, password});
        const newUserResponse = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }
        res.status(201).json(newUserResponse);
    } catch(error){

        // console.error('error 50', error)
        res.status(500).json({message: 'error al crear un usuario <.<', error})
    }
}

//----------------GET-------------------------------------------

export const getUsersController = async (req: Request, res: Response ) => {
    const { page = 1, limit = 10 } = req.query;

    const pages = parseInt(page as string, 10);
    const limits = parseInt(limit as string, 10);

    if(isNaN(pages) || pages < 1 ) {
        return res.status(400).json({ error : "invalid value of page -.-" })
    };
    if(isNaN(limits) || limits < 1 ) {
        return res.status(400).json({ error : "invalid value of limit -.-" })
    };

    try {
        const users = await getUsers(pages, limits);
        const getUsersResponse = users.map(response => {
            return {
            id: response.id,
            name: response.name,
            email: response.email
            }
        })
        res.status(200).json(getUsersResponse);
    } catch (error){
        res.status(500).json({message: 'Error fetching users ->', error})
    };
}

//-------------------------PATCH-----------------------------------

export const patchUsersController = async ( req: Request, res: Response ) => {
    try {
        const {name} = req.body;
        const {uid} = req.params;

        if(!name || !uid) {
            return res.status(400).json({error: 'no hay ningun nombre para cambiar'})
        }

        let userIdCheck: number | null = null;
        let userEmailCheck: string | null = null;

        if(!isNaN(Number(uid))) {
            userIdCheck = parseInt(uid, 10)
        } else {
            userEmailCheck = uid;
        }

        const patchUser = await patchUsers(userIdCheck, userEmailCheck, name);

        const patchUserResponse = {
            id: patchUser.id,
            name: patchUser.name,
            email: patchUser.email
        }

        res.status(200).json(patchUserResponse)
    } catch (error){
        res.status(404).json({error: 'no se pudo actualizar al usuario'})
    }
}