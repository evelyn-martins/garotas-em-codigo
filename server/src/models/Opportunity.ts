import { prisma } from "../config/prisma";
import { OpportunityType } from "../../generated/prisma/enums";

export interface IOpportunity {
    id: string;
    title: string;
    description: string;
    externalLink?: string | null;
    type: OpportunityType;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOpportunityCreate {
    title: string;
    description: string;
    externalLink?: string | null;
    type: OpportunityType;
    areas: string[];
}

export class Opportunity {
    static async getAll(): Promise<IOpportunity[]> {
        const opportunities = await prisma.opportunity.findMany({
            include: {
                areas: {
                    include: { area: true }
                }
            }
        });
        return opportunities.map(o => ({
            id: o.id,
            title: o.title,
            description: o.description,
            externalLink: o.externalLink ?? null,
            type: o.type,
            areas: o.areas.map(a => a.area.name),
            createdAt: o.createdAt,
            updatedAt: o.updatedAt
        }));
    }
    static async getOpportunityByArea(areaId: string): Promise<IOpportunity[]> {
        const opportunities = await prisma.opportunity.findMany({
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
        return opportunities.map(o => ({
            id: o.id,
            title: o.title,
            description: o.description,
            externalLink: o.externalLink ?? null,
            type: o.type,
            areas: o.areas.map(a => a.area.name),
            createdAt: o.createdAt,
            updatedAt: o.updatedAt
        }));
    }
    static async create(data: IOpportunityCreate): Promise<IOpportunity> {
        return await prisma.$transaction(async (prisma) => {
            const opportunity = await prisma.opportunity.create({
                data: {
                    title: data.title,
                    description: data.description,
                    type: data.type,
                    externalLink: data.externalLink || null
                }
            });
            if (data.areas && data.areas.length > 0) {
                for (const areaId of data.areas) {
                    await prisma.opportunityArea.create({
                        data: {
                            opportunityId: opportunity.id,
                            areaId: areaId
                        }
                    });
                }
            }
            return opportunity;
        });
    }
}