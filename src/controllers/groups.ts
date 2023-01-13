import { GroupService } from '../services';
import { StatusCode } from '../types';

const groupService = new GroupService();

export const getGroups = async (req, res) => {
    const groups = await groupService.getAll();
    res.send(groups);
};

export const createGroup = async (req, res) => {
    const body = req.body;

    const newGroup = await groupService.addUser(body.name, body.permissions);

    res.status(StatusCode.CREATED).send(newGroup);
};

export const getGroup = async (req, res) => {
    const id = req.params.id;
    const group = await groupService.getUser(id);

    if(group) {
        return res.send(group);
    }
    res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
};

export const deleteGroup = async (req, res) => {
    const id = req.params.id;

    const isDeleted = await groupService.deleteUser(id);

    if(isDeleted) {
        return res.status(StatusCode.OK).send(`group ${id} deleted`);
    }
    res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
};

export const updateGroup = async (req,res) => {
    const id = req.params.id;
    const body = req.body;

    const isUpdated = await groupService.updateUser(id, body.name, body.permissions);

    if(isUpdated){
        return res.status(StatusCode.OK).send(`${id} id updated`);
    }
    return res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
};
