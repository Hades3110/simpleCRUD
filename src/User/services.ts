import { v4 as uuid } from 'uuid';
import type { User } from './types';

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

        return newUser;
    }

    getAll(){
        return this.users.sort((a, b) => a.login.localeCompare(b.login));
    }

    getUser(id: string){
        return this.users.find((user) => user.id === id);
    }

    updateUser(id: string, login: string, password: string, age: number) {
        this.users = this.users.map(user => {
            if(id === user.id){
                return {
                    ...user,
                    login,
                    age,
                    password,
                };
            }
            return user;
        });
    }

    deleteUser(id: string) {
        this.users = this.users.map(user => {
            if(id === user.id){
                return {
                    ...user,
                    isDeleted: true,
                };
            }
            return user;
        });
    }
}
