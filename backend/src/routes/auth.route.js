import express from "express";
import { signup, login, logout } from "../controllers/auth.comtroller.js"
import {protectRoute} from"..middleware/auth.middleware.js"


const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.put("/update-profile",protectRoute,updateProfile)

export default router;
