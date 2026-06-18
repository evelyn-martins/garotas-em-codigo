import { Router } from "express";
import {
    createConnection,
    getPendingConnections,
    getActiveConnections,
    getConnection,
    acceptConnection,
    rejectConnection,
} from "../controllers/connectionController";
import { authenticateToken } from "../middleware/auth";

const connectionRoutes = Router();

connectionRoutes.post('/', authenticateToken, createConnection);
connectionRoutes.get('/pending', authenticateToken, getPendingConnections);
connectionRoutes.get('/active', authenticateToken, getActiveConnections);
connectionRoutes.get('/:connectionId', authenticateToken, getConnection);
connectionRoutes.patch('/:connectionId/accept', authenticateToken, acceptConnection);
connectionRoutes.patch('/:connectionId/reject', authenticateToken, rejectConnection);

export default connectionRoutes;
