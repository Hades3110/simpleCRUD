import { v4 as uuid } from 'uuid';
import type { Group, Permission } from '../types';
import { GroupModel } from '../models';
import { checkUUID } from '../helpers';

export class GroupService {
    addGroup(name: string, permissions: Permission[]) {
        const newGroup: Group = {
            id: uuid(),
            name,
            permissions,
        };

        GroupModel.create({
            ...newGroup,
        });

        return newGroup;
    }

    async getAll (){
        const groups = await GroupModel.findAll();
        return groups.map(group => group.dataValues).sort((a, b) => a.name.localeCompare(b.name));
    }

    async getGroup(id: string){
        if(!checkUUID(id)) return null;
        return await GroupModel.findByPk(id);
    }

    async updateGroup(id: string, name: string, permissions: Permission[]) {
        if(!checkUUID(id)) return null;
        const affectedCount = await GroupModel.update({ name, permissions }, {
            where: { id },
        });
        return !!affectedCount[0];
    }

    async deleteGroup(id: string) {
        if(!checkUUID(id)) return null;
        const isDeleted = await GroupModel.destroy({
            where: { id },
        });
        return !!isDeleted;
    }
}