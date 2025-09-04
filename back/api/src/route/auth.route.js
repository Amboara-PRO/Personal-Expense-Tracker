import express from 'express';
import { logInUser, createUser} from '../controller/auth.controller.js';

const authRoute = express.Router();

authRoute.get("/auth/login", logInUser);
authRoute.post("/auth/signup", createUser);

export default authRoute;