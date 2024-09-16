import express, { Application } from 'express';
import taxiRoutes from './routes/taxisRoutes';
import trajectoriesRoutes from './routes/trajectoriesRoutes';
import usersRoutes from './routes/usersRoutes';

const app: Application = express();

app.use(express.json());

app.use(taxiRoutes);
app.use(trajectoriesRoutes);
app.use(usersRoutes);

export default app;