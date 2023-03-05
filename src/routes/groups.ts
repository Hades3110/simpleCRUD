import express from 'express';
import { getGroup, getGroups, createGroup, deleteGroup, updateGroup } from '../controllers/groups';
import { groupValidate } from '../middleware/groupValidation';

const router = express.Router();

router.get('/', getGroups);

router.post('/', groupValidate, createGroup);

router.get('/:id', getGroup);

router.delete('/:id', deleteGroup);

router.put('/:id', groupValidate, updateGroup);

export default router;
