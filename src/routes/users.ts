import express from 'express';
import { getUser, getUsers, deleteUser, createUser, updateUser } from '../controllers/users';
import { userValidationSchema } from '../middleware/userValidation';

const router = express.Router();

router.get('/', getUsers);

router.post('/', userValidationSchema,  createUser);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

router.put('/:id', userValidationSchema,  updateUser);

export default router;
