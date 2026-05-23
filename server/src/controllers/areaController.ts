import { Request, Response } from "express";
import { Area } from "../models/Area";
import { IArea } from "../models/Area";

export const getAllAreas = async (req: Request, res: Response) => {
    try {
        const areas: IArea[] = await Area.getAll();
        return res.status(200).json(areas);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getAreasByUserId = async (req: Request, res: Response) => {
    try{
        const {userId} = req.params;
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return res.status(401).json({ message: 'ID do usuário é obrigatório' });
        }
        const areas: IArea[] = await Area.getAreasByUserId(userId);
        return res.status(200).json(areas);
    }catch(error){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const createArea = async (req: Request, res: Response) => {
    try{
        const { name, description } = req.body;
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Nome da área é obrigatório' });
        }
        const newArea: IArea = await Area.create(name, description);
        return res.status(201).json(newArea);
    }catch(error){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}