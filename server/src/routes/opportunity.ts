import { Router } from "express";
import { createOpportunity, getAllOpportunities, getOpportunitiesByArea } from "../controllers/opportunityController";
import { authenticateToken, requireAdmin } from "../middleware/auth";
const opportunityRoutes = Router();

opportunityRoutes.get('/', authenticateToken, getAllOpportunities);
opportunityRoutes.get('/area/:areaId', authenticateToken, getOpportunitiesByArea);
opportunityRoutes.post('/', authenticateToken, requireAdmin, createOpportunity);

export default opportunityRoutes;