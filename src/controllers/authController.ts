import { Request, Response } from "express";


export const authUserController = async ( req: Request, res: Response ) => {
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({error: 'se necesita el usuario y la contraseña'})
    }
    try{
        // const findUser = await authUser(email, password);

    } catch(e){

    }
}