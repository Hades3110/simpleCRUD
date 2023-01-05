import type { Request, Response, NextFunction } from 'express';
import isUUID from 'is-uuid';
import Joi from 'joi';
import { StatusCode } from '../types';

const userSchema = Joi.object({
    login: Joi.string()
        .required()
        .alphanum()
        .min(3)
        .max(10),
    password: Joi.string()
        .required()
        .alphanum(),
    age: Joi.number()
        .min(4)
        .max(130),
});


export const userValidationSchema = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body;

    const errors = userSchema.validate(body).error;
    if(errors){
        return res.status(StatusCode.BAD_REQUEST).send(errors);
    }

    next();
};

export const checkUUID = (id: string) => isUUID.v4(id);
