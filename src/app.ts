import express, { Application, Request, Response } from 'express';

const app: Application = express();

const PORT: number = 3001;

// app.use('/', (req: Request, res: Response): void => {
//     res.send('Hi multiverse');
// });

//Ruta GET
app.get('/taxis', (req: Request, res: Response) => {
    res.send('hay un GET taxis *.*')
})

app.listen(PORT, (): void => {
    console.log('SERVER IS UP :D ON PORT:', PORT);
});