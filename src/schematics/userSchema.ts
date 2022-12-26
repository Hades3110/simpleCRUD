import Joi from 'joi';

export const userSchema = Joi.object({
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
