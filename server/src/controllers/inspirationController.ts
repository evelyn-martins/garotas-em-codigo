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

export const createInspiration = async (req: Request, res: Response) => {
    try {
        const { name, subtitle, description, image } = req.body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Nome é obrigatório' });
        }
        if (!subtitle || typeof subtitle !== 'string' || subtitle.trim() === '') {
            return res.status(400).json({ message: 'Subtítulo é obrigatório' });
        }
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ message: 'Descrição é obrigatória' });
        }
        const data: IInspirationCreate = { name, subtitle, description, image };
        const inspiration = await Inspiration.create(data);
        return res.status(201).json(inspiration);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}