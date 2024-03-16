import express, { Router } from "express";
import { getAllUsers, getById } from "../controllers/user.controller.js";
import { verifyAdmin, verifyUser } from "../funs/verify.js";

const router = express.Router();

router.get('/',verifyAdmin, getAllUsers);

router.get('/:id',verifyUser,  getById);


export default router;
