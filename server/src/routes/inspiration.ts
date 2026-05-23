import { Router } from "express";
import { createInspiration, getAllInspirations, getInspirationsByArea } from "../controllers/inspirationController";
import { authenticateToken, requireAdmin } from "../middleware/auth";
const inspirationRoutes = Router();

inspirationRoutes.get('/', authenticateToken, getAllInspirations);
inspirationRoutes.get('/area/:areaId', authenticateToken, getInspirationsByArea);
inspirationRoutes.post('/', authenticateToken, requireAdmin, createInspiration);

export default inspirationRoutes;