import { Request, Response } from "express";
import { Connection } from "../models/Connection";
import { StatusConnection } from "../../generated/prisma/enums";

export const createConnection = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const requesterId = req.user.id;
        const { guideId, areaId } = req.body;

        if (!guideId || !areaId) {
            return res.status(400).json({ message: 'Guia e área são obrigatórias' });
        }
        if (guideId === requesterId) {
            return res.status(400).json({ message: 'Você não pode solicitar mentoria para si mesma' });
        }

        const existing = await Connection.findExisting(requesterId, guideId, areaId);
        if (existing) {
            if (existing.status === StatusConnection.PENDING) {
                return res.status(409).json({ message: 'Você já enviou uma solicitação para esta guia nesta área' });
            }
            if (existing.status === StatusConnection.ACCEPTED) {
                return res.status(409).json({ message: 'Vocês já possuem uma mentoria ativa nesta área' });
            }
            const reopened = await Connection.reopen(existing.id);
            return res.status(201).json({ connection: reopened });
        }

        const connection = await Connection.create({ requesterId, receiverId: guideId, areaId });
        return res.status(201).json({ connection });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const getPendingConnections = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const connections = await Connection.getPendingByReceiver(req.user.id);
        return res.status(200).json({ connections });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const getActiveConnections = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const connections = await Connection.getActiveByUser(req.user.id);
        return res.status(200).json({ connections });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const getConnection = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { connectionId } = req.params;
        if (!connectionId || typeof connectionId !== 'string') {
            return res.status(400).json({ message: 'ID da mentoria é obrigatório' });
        }
        if (!(await Connection.isParticipant(connectionId, req.user.id))) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        const connection = await Connection.findByIdWithRelations(connectionId);
        if (!connection) {
            return res.status(404).json({ message: 'Mentoria não encontrada' });
        }
        return res.status(200).json({ connection });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const acceptConnection = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { connectionId } = req.params;
        if (!connectionId || typeof connectionId !== 'string') {
            return res.status(400).json({ message: 'ID da solicitação é obrigatório' });
        }
        const connection = await Connection.findById(connectionId);
        if (!connection) {
            return res.status(404).json({ message: 'Solicitação não encontrada' });
        }
        if (connection.receiverId !== req.user.id) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        const accepted = await Connection.acceptConnection(connectionId);
        return res.status(200).json({ connection: accepted });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const rejectConnection = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { connectionId } = req.params;
        if (!connectionId || typeof connectionId !== 'string') {
            return res.status(400).json({ message: 'ID da solicitação é obrigatório' });
        }
        const connection = await Connection.findById(connectionId);
        if (!connection) {
            return res.status(404).json({ message: 'Solicitação não encontrada' });
        }
        if (connection.receiverId !== req.user.id) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        const rejected = await Connection.rejectConnection(connectionId);
        return res.status(200).json({ connection: rejected });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};
