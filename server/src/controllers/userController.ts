import { Request, Response } from "express";
import { IUserCreate, User } from "../models/User";

export const updateProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { name, email, username, image, description } = req.body;
        const userId = req.user.id;

        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({ message: 'Email inválido' });
            }
        }

        const updateData: Partial<IUserCreate> = { name, email, username, image, description};
        const updatedUser = await User.updateProfile(userId, updateData);
        const publicUser = User.toPublic(updatedUser);

        return res.status(200).json({ message: 'Perfil atualizado com sucesso', user: publicUser });
    } catch (error) {
        if (error instanceof Error && (error.message.includes('Email já está em uso') || error.message.includes('Usuário já está em uso'))) {
            return res.status(400).json({ message: error.message });
        }
        if (error instanceof Error && error.message.includes('Usuário não encontrado')) {
            return res.status(404).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const publicUser = User.toPublic(user);
        return res.status(200).json({ user: publicUser });
    }catch(error){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const changePassword = async (req: Request, res: Response) => {
    try{
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const { oldPassword, newPassword } = req.body;
        if( !oldPassword || !newPassword) {
            return res.status(400).json({ message: 'Senha atual e nova senha são obrigatórias' });
        }
        if(oldPassword === newPassword) {
            return res.status(400).json({ message: 'A nova senha deve ser diferente da senha atual' });
        }
        if( newPassword.length < 6) {
            return res.status(400).json({ message: 'A nova senha deve conter pelo menos 6 caracteres' });
        }
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const isValidPassword = await User.validatePassword(user, oldPassword);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Senha atual incorreta' });
        }
        await User.changePassword(userId, newPassword);
        return res.status(200).json({ message: 'Senha alterada com sucesso' });
    }catch(error){
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}