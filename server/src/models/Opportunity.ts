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

export class Opportunity{
    static async getAll(): Promise<IOpportunity[]> {
        return await prisma.opportunity.findMany();
    }
    static async getOpportunityByArea(areaId: string): Promise<IOpportunity[]> {
        return await prisma.opportunity.findMany({
            where: {
                areas: {
                    some: {
                        areaId: areaId
                    }
                }
            }
        });
    }
}