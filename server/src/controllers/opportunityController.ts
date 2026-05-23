import { Request, Response } from 'express';
import { IOpportunityCreate, Opportunity } from '../models/Opportunity';
import { OpportunityType } from '../../generated/prisma/enums';

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

export const createOpportunity = async (req: Request, res: Response) => {
    const { title, description, type, externalLink, areas } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ message: 'Título é obrigatório' });
    }
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ message: 'Descrição é obrigatória' });
    }
    if (!type || typeof type !== 'string' || type.trim() === '') {
        return res.status(400).json({ message: 'Tipo é obrigatório' });
    }
    if (!Object.values(OpportunityType).includes(type as OpportunityType)) {
        return res.status(400).json({ message: 'Tipo de oportunidade inválido. Valores permitidos: COURSE, EVENT, SCHOLARSHIP, JOB' });
    }
    if (areas !== undefined && !Array.isArray(areas)) {
        return res.status(400).json({ message: 'Áreas inválidas' });
    }
    const opportunityType = type as OpportunityType;
    try {
        const data: IOpportunityCreate = { title, description, externalLink, type: opportunityType, areas };
        const opportunity = await Opportunity.create(data);
        return res.status(201).json(opportunity);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}