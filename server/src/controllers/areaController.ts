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