import { GroupService } from '../services';
import { StatusCode } from '../types';

const groupService = new GroupService();

export const getGroups = async (req, res) => {
    const groups = await groupService.getAll();
    res.send(groups);
};

export const createGroup = async (req, res) => {
    const body = req.body;

    const newGroup = await groupService.addGroup(body.name, body.permissions);

    res.status(StatusCode.CREATED).send(newGroup);
};

export const getGroup = async (req, res) => {
    const id = req.params.id;
    const group = await groupService.getGroup(id);

    if(group) {
        return res.send(group);
    }
    res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
};

export const deleteGroup = async (req, res) => {
    const id = req.params.id;

    const isDeleted = await groupService.deleteGroup(id);

    if(isDeleted) {
        return res.status(StatusCode.OK).send(`group ${id} deleted`);
    }
    res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
};

export const updateGroup = async (req,res) => {
    const id = req.params.id;
    const body = req.body;

    const isUpdated = await groupService.updateGroup(id, body.name, body.permissions);

    if(isUpdated){
        return res.status(StatusCode.OK).send(`${id} id updated`);
    }
    return res.status(StatusCode.NOT_FOUND).send(`group ${id} not found`);
};
