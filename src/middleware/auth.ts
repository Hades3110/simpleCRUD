import * as dotenv from 'dotenv';
import * as process from 'process';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { StatusCode } from '../types';

dotenv.config();
const secretKey = process.env.SECRET_KEY;

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['authorization'];

    if(!token){
        return res.status(StatusCode.UNAUTHORIZED).send('Authorization header not found');
    }

    try {
        jwt.verify(token, secretKey);
        next();
    } catch (error) {
        res.status(StatusCode.FORBIDDEN).json({ message: 'Invalid token' });
    }
};
