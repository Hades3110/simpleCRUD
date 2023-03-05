import { v4 as uuid } from 'uuid';
import type { User } from '../types';
import { GroupModel, UserModel } from '../models';
import { checkUUID } from '../helpers';
import { sequelize } from '../data-access';
import { UsersGroupModel } from '../models/UsersGroupModel';

export class UserService {
    async addUser(login: string, password: string, age: number): Promise<User> {
        const newUser: User = {
            id: uuid(),
            isDeleted: false,
            login,
            password,
            age,
        };

        await UserModel.create({
            ...newUser,
        });

        return newUser;
    }

    async getAll (): Promise<User[]> {
        const users = await UserModel.findAll({ where: { isDeleted: false } });
        return users.map(users => users.dataValues).sort((a, b) => a.login.localeCompare(b.login));
    }

    async getUser(id: string): Promise<User> {
        if(!checkUUID(id)) return null;
        const user = await UserModel.findByPk(id);
        return user.dataValues;
    }

    async updateUser(id: string, login: string, password: string, age: number): Promise<boolean> {
        if(!checkUUID(id)) return null;
        const affectedCount = await UserModel.update({ login, age, password }, {
            where: { id },
        });
        return !!affectedCount[0];
    }

    async deleteUser(id: string): Promise<boolean> {
        if(!checkUUID(id)) return null;
        const isDeleted = await UserModel.update({ isDeleted: true }, {
            where: { id },
        });
        return !!isDeleted;
    }

    async addUsersToGroup (groupId: string, userId: string): Promise<boolean> {
        if(!checkUUID(groupId) && !checkUUID(userId)) return false;
        try {
            await sequelize.transaction(async (t) => {
                const user = await UserModel.findByPk(userId, { transaction: t });
                const group = await GroupModel.findByPk(groupId, { transaction: t });

                if(user && group) {
                    await UsersGroupModel.create({
                        UserId: userId,
                        GroupId: groupId
                    }, { transaction: t });
                }
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
