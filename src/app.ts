import express, { Application } from 'express';
import taxiRoutes from './routes/taxisRoutes';
import trajectoriesRoutes from './routes/trajectoriesRoutes'

const app: Application = express();

app.use(taxiRoutes);
app.use(trajectoriesRoutes);

export default app;