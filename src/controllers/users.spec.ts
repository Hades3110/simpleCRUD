import { getUsers, createUser, getUser, deleteUser, updateUser } from './users';
import { UserService } from '../services';
import { User, StatusCode } from '../types';

jest.mock('../services');

describe('User controller', () => {
    let req, res, next;

    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            sendStatus: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getUsers', () => {
        it('should return all users', async () => {
            const users: User[] = [
                {
                    id: '1',
                    login: 'login',
                    password: 'pass',
                    age: 20,
                    isDeleted: false,
                },
                {
                    id: '2',
                    login: 'login',
                    password: 'pass',
                    age: 20,
                    isDeleted: false,
                },
            ];
            const getAllSpy = jest.spyOn(UserService.prototype, 'getAll').mockResolvedValue(users);

            await getUsers(req, res, next);

            expect(getAllSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(users);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(UserService.prototype, 'getAll').mockImplementation(() => {
                throw new Error();
            });

            await getUsers(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('createUser', () => {
        it('should return new user', async () => {
            const request: Omit<User, 'id' | 'isDeleted'> = {
                login: 'login',
                password: 'pass',
                age: 20,
            };
            const expectedResponse: User = {
                ...request,
                id: '1',
                isDeleted: false,
            };

            const addUserSpy = jest
                .spyOn(UserService.prototype, 'addUser')
                .mockResolvedValue(expectedResponse);

            req.body = {
                login: request.login,
                password:request.password,
                age:request.age,
            };

            await createUser(req, res, next);

            expect(addUserSpy).toHaveBeenCalledWith(request.login, request.password, request.age);
            expect(res.send).toHaveBeenCalledWith(expectedResponse);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(UserService.prototype, 'addUser').mockImplementation(() => {
                throw new Error();
            });

            await createUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('getUser', () => {
        const id = '1';

        beforeEach(() => {
            req.params = {id};
        });

        it('should return user', async () => {
            const expectedUser: User = {
                    id: '2',
                    login: 'login',
                    password: 'pass',
                    age: 20,
                    isDeleted: false,
                };

            const getUserSpy = jest.spyOn(UserService.prototype, 'getUser')
                .mockResolvedValue(expectedUser);

            await getUser(req, res, next);

            expect(getUserSpy).toHaveBeenCalledWith(id);
            expect(res.send).toHaveBeenCalledWith(expectedUser);
            expect(next).toHaveBeenCalled();
        });
        it('should return 404 status', async () => {
            jest.spyOn(UserService.prototype, 'getUser')
                .mockResolvedValue(undefined);

            await getUser(req, res, next);

            expect(res.send).toHaveBeenCalledWith(`user ${id} not found`);
            expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(UserService.prototype, 'getUser').mockImplementation(() => {
                throw new Error();
            });

            await getUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('deleteUser', () => {
        const id = '1';

        beforeEach(() => {
            req.params = {id};
        });

        it('should return 200 status', async () => {
            const deleteUserSpy = jest.spyOn(UserService.prototype, 'deleteUser')
                .mockResolvedValue(true);

            await deleteUser(req, res, next);

            expect(deleteUserSpy).toHaveBeenCalledWith(id);
            expect(res.send).toHaveBeenCalledWith(`user ${id} deleted`);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(next).toHaveBeenCalled();
        });
        it('should return 404 status', async () => {
            jest.spyOn(UserService.prototype, 'deleteUser')
                .mockResolvedValue(false);

            await deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
            expect(res.send).toHaveBeenCalledWith(`user ${id} not found`);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(UserService.prototype, 'deleteUser').mockImplementation(() => {
                throw new Error();
            });

            await deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('updateUser', () => {

        const updatedUser: User = {
            id: '2',
            login: 'login',
            password: 'pass',
            age: 20,
            isDeleted: false,
        };
        const id = '1';

        beforeEach(() => {
            req.params = {id};
        });

        it('should return 200 status', async () => {
            const updateUserSpy = jest.spyOn(UserService.prototype, 'updateUser')
                .mockResolvedValue(true);

            req.body = {...updatedUser};
            await updateUser(req, res, next);

            expect(updateUserSpy).toHaveBeenCalledWith(id, updatedUser.login, updatedUser.password, updatedUser.age);
            expect(res.send).toHaveBeenCalledWith(`${id} id updated`);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(next).toHaveBeenCalled();
        });
        it('should return 404 status', async () => {
            jest.spyOn(UserService.prototype, 'updateUser')
                .mockResolvedValue(false);

            req.body = {...updatedUser};
            await updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
            expect(res.send).toHaveBeenCalledWith(`user ${id} not found`);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(UserService.prototype, 'updateUser').mockImplementation(() => {
                throw new Error();
            });

            await updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
});
