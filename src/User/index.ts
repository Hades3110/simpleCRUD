import express from 'express';
import { getUser, getUsers, deleteUser, createUser, updateUser } from './controller';

const router = express.Router();

router.get('/', getUsers);

router.post('/', createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', updateUser);

export default router;
