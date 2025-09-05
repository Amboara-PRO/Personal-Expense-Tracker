import express from 'express';
import { loginUser, createUser , getUser } from '../controller/auth.controller.js';
import { authMiddleware } from '../utils/authMiddleware.js';
const authRoute = express.Router();

authRoute.post("/signup", createUser);
authRoute.post("/login", loginUser);
authRoute.get("/me",authMiddleware, getUser);

export default authRoute;