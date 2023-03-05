import { v4 as uuid } from 'uuid';
import type { Group, Permission } from '../types';
import { GroupModel } from '../models';
import { checkUUID } from '../helpers';

export class GroupService {
    async addGroup(name: string, permissions: Permission[]): Promise<Group> {
        const newGroup: Group = {
            id: uuid(),
            name,
            permissions,
        };

        await GroupModel.create({
            ...newGroup,
        });

        return newGroup;
    }

    async getAll(): Promise<Group[]>{
        const groups = await GroupModel.findAll();
        return groups.map(group => group.dataValues).sort((a, b) => a.name.localeCompare(b.name));
    }

    async getGroup(id: string): Promise<Group>{
        if(!checkUUID(id)) return null;
        const group = await GroupModel.findByPk(id);
        return group.dataValues;
    }

    async updateGroup(id: string, name: string, permissions: Permission[]): Promise<boolean> {
        if(!checkUUID(id)) return null;
        const affectedCount = await GroupModel.update({ name, permissions }, {
            where: { id },
        });
        return !!affectedCount[0];
    }

    async deleteGroup(id: string): Promise<boolean> {
        if(!checkUUID(id)) return null;
        const isDeleted = await GroupModel.destroy({
            where: { id },
        });
        return !!isDeleted;
    }
}
