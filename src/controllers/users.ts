import { v4 as uuid } from 'uuid';
import { User } from '../types';

let users: User[] = [];

export const getUsers = (req, res) => {
    res.send(users.sort((a, b) => a.login.localeCompare(b.login)));
};

export const createUser = (req, res) => {
    const body = req.body;

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
        res.send(user);
        return;
    }
    res.status(404).send(`user ${id} not found`);
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if(!user) {
        res.status(404).send(`user ${id} not found`);
        return;
    }
    user.isDeleted = true;
    res.status(200).send(user);
};

export const updateUser =  (req,res) => {
    const id = req.params.id;
    users = users.map(user => {
        if(id === user.id){
            return {
                ...user,
                login: req.body.login,
                age: req.body.age,
                password: req.body.password,
            };
        }
        return user;
    });

    res.status(200).send(`${id} id updated`);
};
