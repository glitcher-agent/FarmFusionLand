import express, { Router } from "express";
import { login, register, registerAdmin, sendEmail, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/register", register );

router.post("/login", login);

router.post("/registeradmin" , registerAdmin);

router.post("/forget", sendEmail);

router.post("/reset", resetPassword);

// router.post("/createcollection", createCollection);


export default router;