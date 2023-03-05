import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StatusCode } from '../types';

const groupSchema = Joi.object({
    name: Joi.string()
        .required()
        .alphanum()
        .min(3)
        .max(10),
    permissions: Joi.array()
        .items(Joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'))
        .required(),
});

export const groupValidate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const body = req.body;

    const errors = groupSchema.validate(body).error;
    if(errors){
        return res.status(StatusCode.BAD_REQUEST).send(errors);
    }

    next();
};
