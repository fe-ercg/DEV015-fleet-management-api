import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_KEY = 'admin';

export const authToken = ( req: Request, res: Response, next: NextFunction) => {
    const headerAuth = req.headers['authorization'];
    const token = headerAuth && headerAuth.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'no hay un token proporcionado'});
    }

    jwt.verify(token, JWT_KEY, (e:any, user:any) => {
        if(e){
            return res.status(401).json({error: 'token no valido'})
        }

        res.locals.user = user;

        next()
    })
}
