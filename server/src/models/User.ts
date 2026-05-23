import { Role } from "../../generated/prisma/enums";
import { prisma } from '../config/prisma';
import bcrypt from 'bcrypt';

export interface IUser {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    description: string | null;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserCreate {
    name: string;
    username: string;
    email: string;
    password: string;
    image: string | null;
    description: string | null;
    role: Role;
    areas: string[];
}

export interface IUserUpdate {
    name?: string;
    username?: string;
    email?: string;
    image?: string | null;
    description?: string | null;
}

export interface IUserPublic {
    id: string;
    name: string;
    username: string;
    email: string;
    image: string | null;
    description: string | null;
    role: Role;
}

export class User {
    static async create(userData: IUserCreate): Promise<IUser> {
        const existingUser = await prisma.user.findUnique({
            where: { email: userData.email },
        });

        if (existingUser) {
            throw new Error('Email já está em uso');
        }

        const existingUsername = await prisma.user.findUnique({
            where: { username: userData.username },
        });

        if (existingUsername) {
            throw new Error('Usuário já está em uso');
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

        return await prisma.$transaction(async (prisma) => {
            const newUser = await prisma.user.create({
                data: {
                    name: userData.name,
                    username: userData.username,
                    email: userData.email,
                    password: hashedPassword,
                    image: userData.image || null,
                    description: userData.description || null,
                    role: userData.role,
                }
            });
            if (userData.areas && userData.areas.length > 0) {
                for (const areaId of userData.areas) {
                    await prisma.userArea.create({
                        data: {
                            userId: newUser.id,
                            areaId
                        }
                    });
                }
            }
            return newUser;
        });
    }
    static async findByEmail(email: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }
    static async validatePassword(user: IUser, password: string): Promise<boolean> {
        return bcrypt.compare(password, user.password);
    }
    static async updateProfile(id: string, updateData: Partial<IUserUpdate>): Promise<IUser> {
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });
        if (!existingUser) {
            throw new Error('Usuário não encontrado');
        }

        const dataUpdate: Partial<IUserUpdate> = {};

        if (updateData.name) dataUpdate.name = updateData.name;
        if (updateData.username) {
            const existingUsername = await prisma.user.findUnique({
                where: { username: updateData.username },
            });
            if (existingUsername && existingUsername.id !== id) {
                throw new Error('Usuário já está em uso');
            }
            dataUpdate.username = updateData.username;
        }
        if (updateData.email) {
            const existingEmail = await prisma.user.findUnique({
                where: { email: updateData.email },
            });
            if (existingEmail && existingEmail.id !== id) {
                throw new Error('Email já está em uso');
            }
            dataUpdate.email = updateData.email;
        }
        if (updateData.image !== undefined) dataUpdate.image = updateData.image;
        if (updateData.description !== undefined) dataUpdate.description = updateData.description;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: dataUpdate,
        });
        return updatedUser;
    }
    static async changePassword(id: string, newPassword: string): Promise<void> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
    }
    static async findById(id: string): Promise<IUser | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    }
    static toPublic(user: IUser): IUserPublic {
        const { password, ...publicUser } = user;
        return publicUser;
    }
}