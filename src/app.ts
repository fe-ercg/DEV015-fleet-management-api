import express, { Application } from 'express';
import taxiRoutes from './routes/taxisRoutes';
import trajectoriesRoutes from './routes/trajectoriesRoutes'
import latestRoutes from './routes/latestRoutes'

const app: Application = express();

app.use(taxiRoutes);
app.use(trajectoriesRoutes);
app.use(latestRoutes);

export default app;