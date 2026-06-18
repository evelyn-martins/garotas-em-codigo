import { prisma } from '../config/prisma';

export interface IInspiration {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    image: string | null;
}

export interface IInspirationCreate {
    name: string;
    subtitle: string;
    description: string;
    image: string | null;
}

export class Inspiration {
    static async getAll(): Promise<IInspiration[]> {
        return await prisma.inspiration.findMany();
    }
    static async create(data: IInspirationCreate): Promise<IInspiration> {
        return await prisma.inspiration.create({
            data: {
                name: data.name,
                subtitle: data.subtitle,
                description: data.description,
                image: data.image,
            }
        });
    }
}