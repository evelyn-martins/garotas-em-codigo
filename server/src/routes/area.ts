import { Router } from "express";
import { getAllAreas } from "../controllers/areaController";
const areaRoutes = Router();

areaRoutes.get('/', getAllAreas);

export default areaRoutes;