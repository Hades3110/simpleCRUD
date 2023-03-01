import { UserService } from './userService';
import { checkUUID } from '../helpers';
import { UserModel } from '../models';

const mockUser = {
    id: '1',
    login: 'login',
    password: 'password',
    age: 20,
    isDeleted: false,
};

jest.mock('../models');
jest.mock('uuid', () => ({
    v4: jest.fn().mockReturnValueOnce('1')
}));
jest.mock('../helpers', () => ({
    checkUUID: jest.fn().mockReturnValueOnce(true),
}));

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = new UserService();
    });

    describe('getUser', () => {

        let mockFindByPk: jest.Mock;

        beforeEach(() => {
            mockFindByPk = jest.fn();
            UserModel.findByPk = mockFindByPk.mockResolvedValue({ dataValues: mockUser});
        });
        it('get user with uuid', async () => {
            const user = await userService.getUser('1');

            expect(checkUUID).toHaveBeenCalledWith('1');
            expect(user).toEqual(mockUser);
        });
        it('get user with wrong id', async () => {
            const user = await userService.getUser('wrong');

            expect(checkUUID).toHaveBeenCalledWith('wrong');
            expect(user).toEqual(null);
        });
    });
    describe('addUser', () => {

        let mockCreate: jest.Mock;

        beforeEach(() => {
            mockCreate = jest.fn();
            UserModel.create = mockCreate;
        });

        it('addUser with correct params', async () => {
            const newUser = {
                login: 'login',
                password: 'password',
                age: 10,
            };
            const returnValue = await userService.addUser(newUser.login, newUser.password, newUser.age);

            expect(returnValue).toEqual({
                ...newUser,
                isDeleted: false,
                id: '1'
            });
        });
    });
});
