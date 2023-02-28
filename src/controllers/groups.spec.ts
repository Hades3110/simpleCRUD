import { getGroups, createGroup, getGroup, deleteGroup, updateGroup } from './groups';
import { GroupService } from '../services';
import { Group, StatusCode } from '../types';

jest.mock('../services');

describe('Group controller', () => {
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

    describe('getGroups', () => {
        it('should return all groups', async () => {
            const groups: Group[] = [
                { id: '1', name: 'Group 1', permissions: [] },
                { id: '2', name: 'Group 2', permissions: [] },
            ];
            const getAllSpy = jest.spyOn(GroupService.prototype, 'getAll').mockResolvedValue(groups);

            await getGroups(req, res, next);

            expect(getAllSpy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(groups);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(GroupService.prototype, 'getAll').mockImplementation(() => {
                throw new Error();
            });

            await getGroups(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('createGroup', () => {
        it('should return new group', async () => {
            const request: Omit<Group, 'id'> = {
                name: 'newGroupName',
                permissions: ['READ'],
            };
            const expectedResponse: Group = {
                ...request,
                id: '1',
            };
            const addGroupSpy = jest
                .spyOn(GroupService.prototype, 'addGroup')
                .mockResolvedValue(expectedResponse);

            req.body = {
                name: request.name,
                permissions:request.permissions,
            };

            await createGroup(req, res, next);

            expect(addGroupSpy).toHaveBeenCalledWith(request.name, request.permissions);
            expect(res.send).toHaveBeenCalledWith(expectedResponse);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(GroupService.prototype, 'addGroup').mockImplementation(() => {
                throw new Error();
            });

            await createGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('getGroup', () => {
        const id = '1';

        beforeEach(() => {
            req.params = {id};
        });

        it('should return group', async () => {
            const expectedGroup: Group = {
                name: 'newGroupName',
                permissions: ['READ'],
                id: '1',
            };

            const getGroupSpy = jest.spyOn(GroupService.prototype, 'getGroup')
                .mockResolvedValue(expectedGroup);

            await getGroup(req, res, next);

            expect(getGroupSpy).toHaveBeenCalledWith(id);
            expect(res.send).toHaveBeenCalledWith(expectedGroup);
            expect(next).toHaveBeenCalled();
        });
        it('should return 404 status', async () => {
            jest.spyOn(GroupService.prototype, 'getGroup')
                .mockResolvedValue(undefined);

            await getGroup(req, res, next);

            expect(res.send).toHaveBeenCalledWith(`group ${id} not found`);
            expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(GroupService.prototype, 'getGroup').mockImplementation(() => {
                throw new Error();
            });

            await getGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('deleteGroup', () => {
        const id = '1';

        beforeEach(() => {
            req.params = {id};
        });

        it('should return 200 status', async () => {
            const deleteGroupSpy = jest.spyOn(GroupService.prototype, 'deleteGroup')
                .mockResolvedValue(true);

            await deleteGroup(req, res, next);

            expect(deleteGroupSpy).toHaveBeenCalledWith(id);
            expect(res.send).toHaveBeenCalledWith(`group ${id} deleted`);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(next).toHaveBeenCalled();
        });
        it('should return 404 status', async () => {
            jest.spyOn(GroupService.prototype, 'deleteGroup')
                .mockResolvedValue(false);

            await deleteGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
            expect(res.send).toHaveBeenCalledWith(`group ${id} not found`);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(GroupService.prototype, 'deleteGroup').mockImplementation(() => {
                throw new Error();
            });

            await deleteGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
    describe('updateGroup', () => {

        const updatedGroup = {
            name: 'newGroupName',
            permissions: ['READ'],
        };
        const id = '1';

        beforeEach(() => {
            req.params = {id};
        });

        it('should return 200 status', async () => {
            const updateGroupSpy = jest.spyOn(GroupService.prototype, 'updateGroup')
                .mockResolvedValue(true);

            req.body = {...updatedGroup};
            await updateGroup(req, res, next);

            expect(updateGroupSpy).toHaveBeenCalledWith(id, updatedGroup.name, updatedGroup.permissions);
            expect(res.send).toHaveBeenCalledWith(`${id} id updated`);
            expect(res.status).toHaveBeenCalledWith(StatusCode.OK);
            expect(next).toHaveBeenCalled();
        });
        it('should return 404 status', async () => {
            jest.spyOn(GroupService.prototype, 'updateGroup')
                .mockResolvedValue(false);

            req.body = {...updatedGroup};
            await updateGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.NOT_FOUND);
            expect(res.send).toHaveBeenCalledWith(`group ${id} not found`);
            expect(next).toHaveBeenCalled();
        });
        it('should return 500 status code', async () => {
            jest.spyOn(GroupService.prototype, 'updateGroup').mockImplementation(() => {
                throw new Error();
            });

            await updateGroup(req, res, next);

            expect(res.status).toHaveBeenCalledWith(StatusCode.INTERNAL_SERVER_ERROR);
            expect(next).toHaveBeenCalled();
        });
    });
});
