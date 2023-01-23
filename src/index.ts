import express from 'express';
import * as dotenv from 'dotenv';
import { usersRoutes, groupsRouter } from './routes';
import { log } from './middleware/logger';
import * as process from 'process';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/groups', groupsRouter);
app.use(log);

app.listen(port, () => console.log(`Running on port ${port}`));
