import express, { Application } from 'express';
import taxiRoutes from './routes/taxisRoutes';

const app: Application = express();

app.use(taxiRoutes);

export default app;
