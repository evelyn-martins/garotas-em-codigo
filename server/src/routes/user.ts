import { Router } from "express";
import { updateProfile, changePassword, getProfile } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";
import { upload } from "../config/multer";
const userRoutes = Router();

userRoutes.get('/profile', authenticateToken, getProfile);
userRoutes.put('/profile', authenticateToken, upload.single('image'), updateProfile);
userRoutes.post('/change-password', authenticateToken, changePassword);

export default userRoutes;