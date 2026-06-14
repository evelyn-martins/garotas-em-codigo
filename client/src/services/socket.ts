import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:3000';

let socket: Socket | null = null;

export function connectSocket(token: string): Socket {
    if (socket?.connected) return socket;
    socket?.disconnect();
    socket = io(SOCKET_URL, {
        auth: { token },
    });
    return socket;
}

export function getSocket(): Socket | null {
    return socket;
}

export function disconnectSocket() {
    socket?.disconnect();
    socket = null;
}