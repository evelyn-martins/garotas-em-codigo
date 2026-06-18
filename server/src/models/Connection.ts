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

interface IConnectionParticipant {
    id: string;
    name: string;
    image: string | null;
}

interface IConnectionAreaInfo {
    id: string;
    name: string;
}

export interface IPendingConnection {
    id: string;
    status: StatusConnection;
    createdAt: Date;
    requester: IConnectionParticipant;
    area: IConnectionAreaInfo;
}

export interface IActiveConnection {
    id: string;
    status: StatusConnection;
    createdAt: Date;
    requester: IConnectionParticipant;
    receiver: IConnectionParticipant;
    area: IConnectionAreaInfo;
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
            data: { status: StatusConnection.REJECTED }
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

    static async findById(connectionId: string): Promise<IConnection | null> {
        return prisma.connection.findUnique({
            where: { id: connectionId },
        });
    }

    static async findByIdWithRelations(connectionId: string): Promise<IActiveConnection | null> {
        return prisma.connection.findUnique({
            where: { id: connectionId },
            select: {
                id: true,
                status: true,
                createdAt: true,
                requester: { select: { id: true, name: true, image: true } },
                receiver: { select: { id: true, name: true, image: true } },
                area: { select: { id: true, name: true } },
            },
        });
    }

    static async findExisting(requesterId: string, receiverId: string, areaId: string): Promise<IConnection | null> {
        return prisma.connection.findUnique({
            where: {
                requesterId_receiverId_areaId: { requesterId, receiverId, areaId },
            },
        });
    }

    static async reopen(connectionId: string): Promise<IConnection> {
        return prisma.connection.update({
            where: { id: connectionId },
            data: { status: StatusConnection.PENDING },
        });
    }

    static async getPendingByReceiver(receiverId: string): Promise<IPendingConnection[]> {
        return prisma.connection.findMany({
            where: { receiverId, status: StatusConnection.PENDING },
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                status: true,
                createdAt: true,
                requester: { select: { id: true, name: true, image: true } },
                area: { select: { id: true, name: true } },
            },
        });
    }

    static async getActiveByUser(userId: string): Promise<IActiveConnection[]> {
        return prisma.connection.findMany({
            where: {
                status: StatusConnection.ACCEPTED,
                OR: [{ requesterId: userId }, { receiverId: userId }],
            },
            orderBy: { updatedAt: 'desc' },
            select: {
                id: true,
                status: true,
                createdAt: true,
                requester: { select: { id: true, name: true, image: true } },
                receiver: { select: { id: true, name: true, image: true } },
                area: { select: { id: true, name: true } },
            },
        });
    }
}