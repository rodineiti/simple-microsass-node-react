import express from 'express';
import cors from 'cors';
import linksRouter from './routes/links';

const app = express();
app.use(express.json());
app.use(cors());
app.use(linksRouter);

export default app;