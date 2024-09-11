import { Request, Response } from "express";
import { createUser } from "../models/usersModel";
import { create } from "domain";
import prisma from "../client";

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

        console.error('error 50', error)
        res.status(500).json({message: 'error al crear un usuario <.<', error})
    }
}