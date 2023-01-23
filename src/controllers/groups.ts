import { GroupService } from '../services';
import { StatusCode } from '../types';

const groupService = new GroupService();

export const getGroups = async (req, res, next) => {
    try {
        const groups = await groupService.getAll();

        req.calledFunction = {
            service: 'groupService',
            method: 'getAll',
            args: [],
        };

        res.send(groups);
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const createGroup = async (req, res, next) => {
    const body = req.body;

    try {
        const newGroup = await groupService.addGroup(body.name, body.permissions);

        req.calledFunction = {
            service: 'groupService',
            method: 'addGroup',
            args: [body.name, body.permissions],
        };

        res.status(StatusCode.CREATED).send(newGroup);
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const getGroup = async (req, res, next) => {
    const id = req.params.id;

    try {
        const group = await groupService.getGroup(id);

        req.calledFunction = {
            service: 'groupService',
            method: 'getGroup',
            args: [id],
        };

        if(group) {
            res.send(group);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const deleteGroup = async (req, res, next) => {
    const id = req.params.id;

    try {
        const isDeleted = await groupService.deleteGroup(id);

        req.calledFunction = {
            service: 'groupService',
            method: 'deleteGroup',
            args: [id],
        };

        if(isDeleted) {
            res.status(StatusCode.OK).send(`group ${id} deleted`);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const updateGroup = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    try {
        const isUpdated = await groupService.updateGroup(id, body.name, body.permissions);

        req.calledFunction = {
            service: 'groupService',
            method: 'updateGroup',
            args: [id, body.name, body.permissions],
        };

        if(isUpdated){
            res.status(StatusCode.OK).send(`${id} id updated`);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
        }
    } catch (e) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};
