import express from 'express';
import { getProfile, updateProfile , deleteProfile} from '../controller/profile.controller.js';
import { authMiddleware } from '../utils/authMiddleware.js';
const profileRoute = express.Router();

profileRoute.get("/",authMiddleware, getProfile);
profileRoute.put("/",authMiddleware, updateProfile);
profileRoute.delete("/",authMiddleware, deleteProfile);
export default profileRoute;
