export interface IOpportunity {
    id: string;
    title: string;
    description: string;
    type: 'EVENT' | 'SCHOLARSHIP' | 'COURSE' | 'JOB';
    link?: string | null;
    createdAt: string;
    area?: {
        id: number;
        name: string;
    } | null;
}