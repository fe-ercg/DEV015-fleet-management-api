import express, { Application, Request, Response } from 'express';
import prisma from './client'

const app: Application = express();

const PORT: number = 3001;

// app.use('/', (req: Request, res: Response): void => {
//     res.send('Hi multiverse');
// });

//Ruta GET
app.get('/taxis', (req: Request, res: Response) => {
    const taxis = [
        { id: 123, plate: 'holaa' },
        { id: 345, plate: 'apoio' },
        { id: 566, plate: 'guasa' }
    ]
    
    res.json(taxis)
})

app.listen(PORT, (): void => {
    console.log('SERVER IS UP :D ON PORT:', PORT);
});

async function main() {
    const allUsers = await prisma
}

main()