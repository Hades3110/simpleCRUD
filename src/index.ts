import express from 'express';
import * as dotenv from 'dotenv';
import usersRoutes from './User';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', usersRoutes);

app.listen(port, () => console.log(`Running on port ${port}`));

