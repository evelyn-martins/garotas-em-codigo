import { Router } from "express";
import { updateProfile, changePassword, getProfile, getGuides, getGuidesByArea, getUserById } from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";
import { upload } from "../config/multer";
const userRoutes = Router();

userRoutes.get('/profile', authenticateToken, getProfile);
userRoutes.put('/profile', authenticateToken, upload.single('image'), updateProfile);
userRoutes.post('/change-password', authenticateToken, changePassword);
userRoutes.get('/guides', authenticateToken, getGuides);
userRoutes.get('/guides/area/:areaId', authenticateToken, getGuidesByArea);
userRoutes.get('/:userId', authenticateToken, getUserById);

export default userRoutes;