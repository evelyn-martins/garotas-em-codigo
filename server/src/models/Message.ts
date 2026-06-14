import { prisma } from '../config/prisma';

export interface IMessage {
    id: string;
    content: string;
    senderId: string;
    receiverId: string;
    connectionId: string;
    createdAt: Date;
}

export interface IMessageCreate {
    content: string;
    senderId: string;
    receiverId: string;
    connectionId: string;
}

export class Message {
    static async create(data: IMessageCreate): Promise<IMessage> {
        return await prisma.message.create({ data });
    }

    static async findByConnection(connectionId: string): Promise<IMessage[]> {
        return await prisma.message.findMany({
            where: { connectionId },
            orderBy: { createdAt: 'asc' },
        });
    }
}