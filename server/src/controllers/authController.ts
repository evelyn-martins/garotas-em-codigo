import { Request, Response } from 'express';
import { User } from '../models/User';
import { Area } from '../models/Area';
import { IUserCreate } from '../models/User';
import { generateToken } from '../middleware/auth';
import { prisma } from '../config/prisma';
import { Role } from '../../generated/prisma/client';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, username, email, password, image, description, role, areas }: IUserCreate = req.body;

        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: 'Todos os campos obrigatórios devem ser preenchidos' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'A senha deve conter pelo menos 6 caracteres' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        if(role !== Role.STUDENT && role !== Role.GUIDE) {
            return res.status(400).json({ message: 'Role inválida. Valores permitidos: STUDENT, GUIDE' });
        }

        if(areas !== undefined && !Array.isArray(areas)) {
            return res.status(400).json({ message: 'Áreas inválidas' });
        }

        if (areas && areas.length === 0 && role === Role.GUIDE) {
            return res.status(400).json({ message: 'Guias devem selecionar pelo menos uma área de interesse' });
        }

        const userData: IUserCreate = { name, username, email, password, image, description, role, areas };

        const user = await User.create(userData);
        
        const token = generateToken(user.id);

        const publicUser = User.toPublic(user);

        return res.status(201).json({ message: 'Usuário registrado com sucesso', user: publicUser, token });
    } catch (error) {
        if (error instanceof Error && (error.message.includes('Email já está em uso') || error.message.includes('Usuário já está em uso'))) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Email inválido' });
        }

        const isValidPassword = await User.validatePassword(user, password);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Senha inválida' });
        }

        const token = generateToken(user.id);
        const publicUser = User.toPublic(user);

        return res.status(200).json({ message: 'Login realizado com sucesso', user: publicUser, token });
    } catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}