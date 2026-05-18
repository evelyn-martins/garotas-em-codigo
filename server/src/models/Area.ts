import {prisma} from '../config/prisma';

export interface IArea {
    id: string;
    name: string;
    description: string | null;
}

export class Area {
    static async getAll(): Promise<IArea[]> {
        return await prisma.techArea.findMany();
    }
    static async createUserArea(userId: string, areaId: string) {
        return await prisma.userArea.create({
            data: {
                userId,
                areaId
            }
        });
    }
}