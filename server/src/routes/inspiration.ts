import { Router } from "express";
import { createInspiration, getAllInspirations } from "../controllers/inspirationController";
import { authenticateToken, requireAdmin } from "../middleware/auth";
const inspirationRoutes = Router();

inspirationRoutes.get('/', getAllInspirations);
inspirationRoutes.post('/', authenticateToken, requireAdmin, createInspiration);

export default inspirationRoutes;