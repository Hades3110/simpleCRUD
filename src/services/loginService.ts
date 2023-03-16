import * as dotenv from 'dotenv';
import * as process from 'process';
import * as jwt from 'jsonwebtoken';
import type { UserService } from './userService';

dotenv.config();

export class LoginService {
    private userService: UserService;
    private secretKey = process.env.SECRET_KEY;
    constructor(UserService) {
        this.userService = new UserService();
    }
    async login(username: string, password: string): Promise<string | null> {
        const userList = await this.userService.getAll();

        const user = userList.find(({login}) => username === login);
        if(user.password === password){
            return jwt.sign({ username, password }, this.secretKey);
        }
        return null;
    }
}
