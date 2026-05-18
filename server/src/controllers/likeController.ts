import { Request, Response } from 'express';
import { Like } from '../models/Like';
import { ILike } from '../models/Like';

export const likePost = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const userId = req.user.id;
        const { postId } = req.params;

        if(!postId || typeof postId !== 'string' || postId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }

        const likeData: ILike = { userId, postId };
        const existingLike = await Like.exists(likeData);
        if(existingLike) {
            return res.status(409).json({ message: 'Post já curtido por este usuário' });
        }
        await Like.create(likeData);
        return res.status(201).json({ message: 'Post curtido com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
export const unlikePost = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const userId = req.user.id;
        const { postId } = req.params;

        if(!postId || typeof postId !== 'string' || postId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }

        const likeData: ILike = { userId, postId };
        const existingLike = await Like.exists(likeData);
        if(!existingLike) {
            return res.status(409).json({ message: 'Post não curtido por este usuário' });
        }
        await Like.delete(likeData);
        return res.status(200).json({ message: 'Curtida removida com sucesso' });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}