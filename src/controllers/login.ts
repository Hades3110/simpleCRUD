import { StatusCode } from '../types';
import { LoginService } from '../services/loginService';
import { UserService } from '../services';

const loginService = new LoginService(UserService);

export const login = async (req, res) => {
    try {
        const { username, password } = req.query;

        req.calledFunction = {
            service: 'loginService',
            method: 'login',
            args: [username, password],
        };

        const token = await loginService.login(username, password);

        if(token) {
            res.send({token});
        } else {
            res.status(StatusCode.BAD_REQUEST).send('invalid username or password');
        }
    } catch (e) {
        req.error = e;
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
};
