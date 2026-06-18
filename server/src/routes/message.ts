import { Router } from 'express';
import { getMessages, createMessage } from '../controllers/messageController';
import { authenticateToken } from '../middleware/auth';

const messageRoutes = Router();

messageRoutes.post('/', authenticateToken, createMessage);
messageRoutes.get('/:connectionId', authenticateToken, getMessages);

export default messageRoutes;