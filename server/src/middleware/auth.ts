import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { User } from "../models/User";

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const headerToken = authHeader && authHeader.split(' ')[1];
        const queryToken = req.query.token as string;
        const token = headerToken || queryToken;

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key') as { userId: string };

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username,
        }
        return next();
    } catch (error) {
        if(error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        console.log(error);
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export const generateToken = (userId: string): string => {
    const jwtSecret = process.env.JWT_SECRET || 'your_secret_key';
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || 2592000;

    return jwt.sign({ userId }, jwtSecret, { expiresIn: Number(jwtExpiresIn) });
}