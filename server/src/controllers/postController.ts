import { Request, Response } from 'express';
import { Post } from '../models/Post';
import { IPostCreate } from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const userId = req.user.id;
        const { content } = req.body;
        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ message: 'Conteúdo do post é obrigatório' });
        }
        const postData: IPostCreate = { userId, content };
        const newPost = await Post.create(postData);
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const updatePost = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const {postId} = req.params;
        const { content } = req.body;
        if (!postId || typeof postId !== 'string' || postId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }
        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ message: 'Conteúdo do post é obrigatório' });
        }
        const updatedPost = await Post.update(postId, content);
        return res.status(200).json(updatedPost);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const deletePost = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const {postId} = req.params;
        if (!postId || typeof postId !== 'string' || postId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }
        await Post.delete(postId);
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getPostsByUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        if (!userId || typeof userId !== 'string' || userId.trim() === '') {
            return res.status(400).json({ message: 'ID do usuário é obrigatório' });
        }
        const posts = await Post.findAllByUserId(userId);
        if (posts.length === 0) {
            return res.status(404).json({ message: 'Nenhum post encontrado para este usuário' });
        }
        return res.status(200).json(posts);
    } catch (error) {
        if (error instanceof Error && error.message.includes('Usuário não encontrado')) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getPostById = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params;
        if (!postId || typeof postId !== 'string' || postId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post não encontrado' });
        }
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await Post.findAll();
        return res.status(200).json(posts);
    } catch {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getPostLikes = async (req: Request, res: Response) => {
    try {
        const {postId} = req.params;
        if (!postId || typeof postId !== 'string' || postId.trim() === '') {
            return res.status(400).json({ message: 'ID do post é obrigatório' });
        }
        const likes = await Post.countLikes(postId);
        return res.status(200).json({ likes });
    }catch(error){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}