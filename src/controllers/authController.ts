import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { findUser } from "../models/authModel";

const JWT_KEY = 'admin'
export const authUserController = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({error: 'se necesita el usuario y la contraseña'})
    }
    try{
        const user = await findUser(email, password);
        if(!user) {
            return res.status(404).json({error: 'no se encontro el usuario'})
        }
        
        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword) {
            return res.status(404).json({error: 'contrase;a incorrecta'})
        };

        const token = jwt.sign(
            {id:user.id, email: user.email},
            JWT_KEY,
            {expiresIn: '1h'}
        )

        const succes = {
            // accessToken: 'wiwo',
            accessToken: token,
            user: {
                id: user.id,
                email: user.email
            }
        }
        return res.status(200).json(succes)
        
    } catch(e){

    }
}