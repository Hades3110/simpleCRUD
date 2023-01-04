import { schema } from './schema';
import { UserService } from './services';
import { StatusCode } from '../types';

const userService = new UserService();

export const getUsers = (req, res) => {
    res.send(userService.getAll());
};

export const createUser = (req, res) => {
    const body = req.body;

    const validationError = schema.validate(body).error;

    if(validationError){
        return res.status(StatusCode.BAD_REQUEST).send(validationError);
    }

    const newUser = userService.addUser(body.login, body.password, body.age);

    res.status(StatusCode.CREATED).send(newUser);
};

export const getUser = (req, res) => {
    const id = req.params.id;
    const user = userService.getUser(id);
    if(user) {
        return res.send(user);
    }
    res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
};

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const user = userService.getUser(id);
    if(!user) {
        return res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
    }
    userService.deleteUser(id);
    res.status(StatusCode.OK).send(user);
};

export const updateUser =  (req,res) => {
    const id = req.params.id;
    const body = req.body;

    const validationError = schema.validate(body).error;

    if(validationError){
        return res.status(StatusCode.BAD_REQUEST).send(validationError);
    }

    userService.updateUser(id, body.login, body.password, body.age);

    res.status(StatusCode.OK).send(`${id} id updated`);
};
