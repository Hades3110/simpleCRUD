import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const UserSequelize = new Sequelize(process.env.DB_URL);
