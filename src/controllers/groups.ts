import { GroupService } from '../services';
import { StatusCode } from '../types';

const groupService = new GroupService();

export const getGroups = async (req, res, next) => {
    try {
        req.calledFunction = {
            service: 'groupService',
            method: 'getAll',
            args: [],
        };

        const groups = await groupService.getAll();

        res.send(groups);
    } catch (e) {
        req.error = e;
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const createGroup = async (req, res, next) => {
    const body = req.body;

    try {
        req.calledFunction = {
            service: 'groupService',
            method: 'addGroup',
            args: [body.name, body.permissions],
        };

        const newGroup = await groupService.addGroup(body.name, body.permissions);

        res.status(StatusCode.CREATED).send(newGroup);
    } catch (e) {
        req.error = e;
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const getGroup = async (req, res, next) => {
    const id = req.params.id;

    try {
        req.calledFunction = {
            service: 'groupService',
            method: 'getGroup',
            args: [id],
        };

        const group = await groupService.getGroup(id);

        if(group) {
            res.send(group);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
        }
    } catch (e) {
        req.error = e;
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const deleteGroup = async (req, res, next) => {
    const id = req.params.id;

    try {
        req.calledFunction = {
            service: 'groupService',
            method: 'deleteGroup',
            args: [id],
        };

        const isDeleted = await groupService.deleteGroup(id);

        if(isDeleted) {
            res.status(StatusCode.OK).send(`group ${id} deleted`);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
        }
    } catch (e) {
        req.error = e;
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};

export const updateGroup = async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;

    try {
        req.calledFunction = {
            service: 'groupService',
            method: 'updateGroup',
            args: [id, body.name, body.permissions],
        };

        const isUpdated = await groupService.updateGroup(id, body.name, body.permissions);

        if(isUpdated){
            res.status(StatusCode.OK).send(`${id} id updated`);
        } else {
            res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
        }
    } catch (e) {
        req.error = e;
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }

    next();
};
