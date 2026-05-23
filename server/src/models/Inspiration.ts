import { prisma } from '../config/prisma';

export interface IInspiration {
    id: string;
    name: string;
    description: string;
    image: string | null;
}

export interface IInspirationCreate {
    name: string;
    description: string;
    image: string | null;
    areas: string[];
}

export class Inspiration {
    static async getAll(): Promise<IInspiration[]> {
        const inspirations = await prisma.inspiration.findMany({
            include: {
                areas: {
                    include: { area: true }
                }
            }
        });

        return inspirations.map(i => ({
            id: i.id,
            name: i.name,
            description: i.description,
            image: i.image ?? null,
            areas: i.areas.map(a => a.area.name)
        }));
    }
    static async create(data: IInspirationCreate): Promise<IInspiration> {
        return await prisma.$transaction(async (prisma) => {
            const inspiration = await prisma.inspiration.create({
                data: {
                    name: data.name,
                    description: data.description,
                    image: data.image,
                }
            });
            if (data.areas && data.areas.length > 0) {
                for (const areaId of data.areas) {
                    await prisma.inspirationArea.create({
                        data: {
                            inspirationId: inspiration.id,
                            areaId
                        }
                    });
                }
            }
            return inspiration;
        });
    }
    static async getByArea(areaId: string): Promise<IInspiration[]> {
        const inspirations = await prisma.inspiration.findMany({
            where: {
                areas: {
                    some: {
                        areaId: areaId
                    }
                }
            },
            include: {
                areas: {
                    include: { area: true }
                }
            }
        });
        return inspirations.map(i => ({
            id: i.id,
            name: i.name,
            description: i.description,
            image: i.image ?? null,
            areas: i.areas.map(a => a.area.name)
        }));
    }
}