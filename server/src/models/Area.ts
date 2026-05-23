import { prisma } from '../config/prisma';

export interface IArea {
    id: string;
    name: string;
    description: string | null;
}

export class Area {
    static async getAll(): Promise<IArea[]> {
        return await prisma.techArea.findMany();
    }
    static async getAreasByUserId(userId: string): Promise<IArea[]> {
        const userAreas = await prisma.userArea.findMany({
            where: { userId },
            include: { area: true }
        });
        return userAreas.map(ua => ({
            id: ua.area.id,
            name: ua.area.name,
            description: ua.area.description
        }));
    }
    static async create(name: string, description?: string): Promise<IArea> {
        return await prisma.techArea.create({
            data: {
                name,
                description: description || null
            }
        });
    }
}