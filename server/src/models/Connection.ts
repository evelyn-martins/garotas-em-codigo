import {prisma} from '../config/prisma';
import { StatusConnection } from '../../generated/prisma/enums';

export interface IConnection {
    id: string;
    requesterId: string;
    receiverId: string;
    areaId: string;
    status: StatusConnection;
    createdAt: Date;
    updatedAt: Date;
}

export interface IConnectionCreate {
    requesterId: string;
    receiverId: string;
    areaId: string;
}

export class Connection {
    static async create(data: IConnectionCreate): Promise<IConnection> {
        const connection = await prisma.connection.create({
            data: {
                requesterId: data.requesterId,
                receiverId: data.receiverId,
                areaId: data.areaId,
                status: StatusConnection.PENDING
            }
        });
        return connection;
    }
    static async acceptConnection(connectionId: string): Promise<IConnection> {
        const connection = await prisma.connection.update({
            where: { id: connectionId },
            data: { status: StatusConnection.ACCEPTED }
        });
        return connection;
    }
    static async rejectConnection(connectionId: string): Promise<IConnection> {
        const connection = await prisma.connection.update({
            where: { id: connectionId },
            data: { status: StatusConnection.CLOSED }
        });
        return connection;
    }
    static async closeConnection(connectionId: string): Promise<IConnection> {
        const connection = await prisma.connection.update({
            where: { id: connectionId },
            data: { status: StatusConnection.CLOSED }
        });
        return connection;
    }

    static async isParticipant(connectionId: string, userId: string): Promise<boolean> {
        const connection = await prisma.connection.findUnique({
            where: { id: connectionId },
            select: { requesterId: true, receiverId: true },
        });
        if (!connection) return false;
        return connection.requesterId === userId || connection.receiverId === userId;
    }
}