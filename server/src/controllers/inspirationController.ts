import { Request, Response } from 'express';
import { Inspiration } from '../models/Inspiration';
import { IInspirationCreate } from '../models/Inspiration';

export const getAllInspirations = async (req: Request, res: Response) => {
    try {
        const inspirations = await Inspiration.getAll();
        return res.status(200).json(inspirations);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getInspirationsByArea = async (req: Request, res: Response) => {
    try {
        const { areaId } = req.params;
        if (!areaId || typeof areaId !== 'string' || areaId.trim() === '') {
            return res.status(400).json({ message: 'ID da área é obrigatório' });
        }
        const inspirations = await Inspiration.getByArea(areaId);
        return res.status(200).json(inspirations);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const createInspiration = async (req: Request, res: Response) => {
    try {
        const { name, description, image, areas } = req.body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Nome é obrigatório' });
        }
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ message: 'Descrição é obrigatória' });
        }
        if(areas !== undefined && !Array.isArray(areas)) {
            return res.status(400).json({ message: 'Áreas inválidas' });
        }
        const data: IInspirationCreate = { name, description, image, areas };
        const inspiration = await Inspiration.create(data);
        return res.status(201).json(inspiration);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}