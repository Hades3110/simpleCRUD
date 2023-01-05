import { v4 as uuid } from 'uuid';
import type { User } from '../types';
import { UserModel } from '../models/userModel';
import { checkUUID } from '../middleware/userValidation';

export class UserService {
    users: User[] = [];

    addUser(login: string, password: string, age: number) {
        const newUser: User = {
            id: uuid(),
            isDeleted: false,
            login,
            password,
            age,
        };

        this.users.push(newUser);

        UserModel.create({
            ...newUser,
        });


        return newUser;
    }

    async getAll (){
        const users = await UserModel.findAll({ where: { isDeleted: false } });
        return users.map(users => users.dataValues).sort((a, b) => a.login.localeCompare(b.login));
    }

    async getUser(id: string){
        if(!checkUUID(id)) return null;
        return await UserModel.findByPk(id);
    }

    async updateUser(id: string, login: string, password: string, age: number) {
        if(!checkUUID(id)) return null;
        const affectedCount = await UserModel.update({ login, age, password }, {
            where: { id },
        });
        return !!affectedCount[0];
    }

    async deleteUser(id: string) {
        if(!checkUUID(id)) return null;
        const isDeleted = await UserModel.update({ isDeleted: true }, {
            where: { id },
        });
        return !!isDeleted;
    }
}
