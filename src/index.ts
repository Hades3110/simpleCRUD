import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { usersRoutes, groupsRouter, loginRouter } from './routes';
import { log } from './middleware/logger';
import { authMiddleware } from './middleware/auth';
import * as process from 'process';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'authorization'],
};

app.use(cors(corsOptions));

app.use('/api/login', loginRouter);

app.use(authMiddleware);
app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRouter);
app.use(log);

app.listen(port, () => console.log(`Running on port ${port}`));
