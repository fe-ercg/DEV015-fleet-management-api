import express, { Application, Request, Response } from 'express';
import prisma from './client'
import { CLIENT_RENEG_WINDOW } from 'tls';
import { get } from 'http';

const app: Application = express();

const PORT: number = 3001;

//Ruta GET
app.get('/taxis', async (req: Request, res: Response) => {
    const { plate, page =1, limit =10 } = req.query;

    const plates = plate ? plate.toString() : '';
    const pages = parseInt(page as string, 10) || 1;
    const limits = parseInt(limit as string, 10) || 10;

    const findPlate = plates ? {plate : {contains: plates} } : {};

    const taxis = await prisma.taxis.findMany({
        // where: {plate: {contains: '12'}},
        where: findPlate,
        skip: (pages -1) * limits,
        take: limits,
    })
    res.json(taxis)
})

app.listen(PORT, (): void => {
    console.log('SERVER IS UP :D ON PORT:', PORT);
});

