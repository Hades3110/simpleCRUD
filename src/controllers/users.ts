import { v4 as uuid } from 'uuid';
import { userSchema } from '../schematics/userSchema';
import { User } from '../types';

let users: User[] = [];

export const getUsers = (req, res) => {
    res.send(users.sort((a, b) => a.login.localeCompare(b.login)));
};

export const createUser = (req, res) => {
    const body = req.body;

    const validationError = userSchema.validate(body).error;

    if(validationError){
        return res.status(400).send(validationError);
    }

    const newUser: User = {
        id: uuid(),
        isDeleted: false,
        login: body.login,
        password: body.password,
        age: body.age,
    };

    users.push(newUser);

    res.status(201).send(newUser);
};

export const getUser = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if(user) {
        return res.send(user);
    }
    res.status(404).send(`user ${id} not found`);
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if(!user) {
        return res.status(404).send(`user ${id} not found`);
    }
    user.isDeleted = true;
    res.status(200).send(user);
};

export const updateUser =  (req,res) => {
    const id = req.params.id;
    const body = req.body;

    const validationError = userSchema.validate(body).error;

    if(validationError){
        return res.status(400).send(validationError);
    }

    users = users.map(user => {
        if(id === user.id){
            return {
                ...user,
                login: body.login,
                age: body.age,
                password: body.password,
            };
        }
        return user;
    });

    res.status(200).send(`${id} id updated`);
};
