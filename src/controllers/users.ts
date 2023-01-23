import { UserService } from '../services';
import { StatusCode } from '../types';

const userService = new UserService();

export const getUsers = async (req, res, next) => {
    const users = await userService.getAll();

    try {
        req.calledFunction = {
            service: 'userService',
            method: 'getAll',
            args: [],
        };

        res.send(users);
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const createUser = async (req, res, next) => {
    const body = req.body;

    try {
        const newUser = await userService.addUser(body.login, body.password, body.age);

        req.calledFunction = {
            service: 'userService',
            method: 'addUser',
            args: [body.login, body.password, body.age],
        };

        res.status(StatusCode.CREATED).send(newUser);
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const getUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await userService.getUser(id);

        req.calledFunction = {
            service: 'userService',
            method: 'getUser',
            args: [id],
        };

        if(user) {
            res.send(user);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const isDeleted = await userService.deleteUser(id);

        req.calledFunction = {
            service: 'userService',
            method: 'deleteUser',
            args: [id],
        };

        if(isDeleted) {
            res.status(StatusCode.OK).send(`user ${id} deleted`);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const updateUser = async (req,res, next) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const isUpdated = await userService.updateUser(id, body.login, body.password, body.age);

        req.calledFunction = {
            service: 'userService',
            method: 'updateUser',
            args: [id, body.login, body.password, body.age],
        };

        if(isUpdated){
            res.status(StatusCode.OK).send(`${id} id updated`);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`user ${id} not found`);
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const addUserToGroup = async (req, res, next) => {
    const userId = req.body.userId;
    const groupId = req.body.groupId;

    try {
        const isUserAdded = userService.addUsersToGroup(groupId,userId);

        req.calledFunction = {
            service: 'userService',
            method: 'addUsersToGroup',
            args: [groupId, userId],
        };

        if(isUserAdded) {
            res.status(StatusCode.OK).send(`user ${userId} added to ${groupId}`);
        } else {
            res.status(StatusCode.BAD_REQUEST).send('Bad request');
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};
