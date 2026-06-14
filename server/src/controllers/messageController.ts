import { Request, Response } from 'express';
import { Message } from '../models/Message';

export const getMessages = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { connectionId } = req.params;
        if (!connectionId || typeof connectionId !== 'string' || connectionId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }
        const messages = await Message.findByConnection(connectionId);
        return res.status(200).json({ messages });
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const createMessage = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { content, receiverId, connectionId } = req.body;
        if (!content || !receiverId || !connectionId) {
            return res.status(400).json({ message: 'content, receiverId e connectionId são obrigatórios' });
        }
        const message = await Message.create({
            content,
            senderId: req.user.id,
            receiverId,
            connectionId,
        });
        return res.status(201).json({ message });
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};