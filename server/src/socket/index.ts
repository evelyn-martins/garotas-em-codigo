import { Server as HttpServer } from 'http';
import { Server as SocketServer, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { Message } from '../models/Message';
import { Connection } from '../models/Connection';

interface AuthSocket extends Socket {
    userId?: string;
}

export function setupSocket(httpServer: HttpServer) {
    const io = new SocketServer(httpServer, {
        cors: { origin: '*' },
    });

    io.use((socket: AuthSocket, next) => {
        const token = socket.handshake.auth.token as string;
        if (!token) return next(new Error('Token não fornecido'));

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key') as { userId: string };
            socket.userId = decoded.userId;
            next();
        } catch {
            next(new Error('Token inválido'));
        }
    });

    io.on('connection', (socket: AuthSocket) => {
        socket.on('join_connection', async (connectionId: string) => {
            try {
                if (!socket.userId) return;
                if (!(await Connection.isParticipant(connectionId, socket.userId))) return;
                socket.join(connectionId);
            } catch {
                socket.emit('error', { message: 'Erro ao entrar na conversa' });
            }
        });

        socket.on('send_message', async (data: { connectionId: string; receiverId: string; content: string }) => {
            try {
                if (!socket.userId) return;
                if (!(await Connection.isParticipant(data.connectionId, socket.userId))) return;

                const message = await Message.create({
                    content: data.content,
                    senderId: socket.userId,
                    receiverId: data.receiverId,
                    connectionId: data.connectionId,
                });

                io.to(data.connectionId).emit('receive_message', message);
            } catch {
                socket.emit('error', { message: 'Erro ao enviar mensagem' });
            }
        });

        socket.on('leave_connection', (connectionId: string) => {
            socket.leave(connectionId);
        });
    });

    return io;
}