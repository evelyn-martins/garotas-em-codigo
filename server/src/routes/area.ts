import { Router } from "express";
import { createArea, getAllAreas, getAreasByUserId } from "../controllers/areaController";
import { authenticateToken, requireAdmin } from "../middleware/auth";
const areaRoutes = Router();

areaRoutes.get('/', getAllAreas);
areaRoutes.get('/user/:userId', authenticateToken, getAreasByUserId);
areaRoutes.post('/', authenticateToken, requireAdmin, createArea);

export default areaRoutes;