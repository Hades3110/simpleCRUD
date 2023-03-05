import express from 'express';
import { getUser, getUsers, deleteUser, createUser, updateUser, addUserToGroup } from '../controllers/users';
import { userValidate } from '../middleware/userValidation';

const router = express.Router();

router.get('/', getUsers);

router.post('/', userValidate,  createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', userValidate,  updateUser);

router.post('/group', addUserToGroup);

export default router;
