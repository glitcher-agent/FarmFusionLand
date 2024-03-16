import express from "express";
import { createRole, deleteRole, getAllRoles, updateRole } from '../controllers/role.controller.js';
import { verifyAdmin } from "../funs/verify.js";

const router = express.Router()

router.post('/create', verifyAdmin, createRole );

router.put('/update/:id', verifyAdmin, updateRole );

router.get('/getAll', getAllRoles);

router.delete('/deletRole/:id', deleteRole);

export default router;