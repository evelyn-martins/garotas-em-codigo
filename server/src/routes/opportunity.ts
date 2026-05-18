import { Router } from "express";
import { getAllOpportunities, getOpportunitiesByArea } from "../controllers/opportunityController";
const opportunityRoutes = Router();

opportunityRoutes.get('/', getAllOpportunities);
opportunityRoutes.get('/area/:areaId', getOpportunitiesByArea);

export default opportunityRoutes;