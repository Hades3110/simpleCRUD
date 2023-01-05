import { UserService } from '../services/userService';
import { StatusCode } from '../types';

const userService = new UserService();

export const getUsers = async (req, res) => {
    const users = await userService.getAll();
    res.send(users);
};

export const createUser = async (req, res) => {
    const body = req.body;

    const newUser = await userService.addUser(body.login, body.password, body.age);

    res.status(StatusCode.CREATED).send(newUser);
};

export const getUser = async (req, res) => {
    const id = req.params.id;
    const user = await userService.getUser(id);

    if(user) {
        return res.send(user);
    }
    res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
};

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    const isDeleted = await userService.deleteUser(id);

    if(isDeleted) {
        return res.status(StatusCode.OK).send(`user ${id} deleted`);
    }
    res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
};

export const updateUser = async (req,res) => {
    const id = req.params.id;
    const body = req.body;

    const isUpdated = await userService.updateUser(id, body.login, body.password, body.age);

    if(isUpdated){
        return res.status(StatusCode.OK).send(`${id} id updated`);
    }
    return res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
};
