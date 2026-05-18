import { Request, Response } from 'express';
import { Opportunity } from '../models/Opportunity';

export const getAllOpportunities = async (req: Request, res: Response) => {
    try {
        const opportunities = await Opportunity.getAll();
        return res.status(200).json(opportunities);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getOpportunitiesByArea = async (req: Request, res: Response) => {
    const { areaId } = req.params;
    if (!areaId || typeof areaId !== 'string' || areaId.trim() === '') {
        return res.status(400).json({ message: 'ID da área é obrigatório' });
    }
    try {
        const opportunities = await Opportunity.getOpportunityByArea(areaId);
        return res.status(200).json(opportunities);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}