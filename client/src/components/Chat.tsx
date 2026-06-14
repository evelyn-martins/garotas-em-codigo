import { useEffect, useRef, useState } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '../services/socket';
import { MessageService } from '../services/MessageService';
import type {IMessage} from '../types/message';

interface ChatProps {
    connectionId: string;
    receiverId: string;
    currentUserId: string;
}

export default function Chat({ connectionId, receiverId, currentUserId }: ChatProps) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const token = localStorage.getItem('token') || '';
        const socket = connectSocket(token);

        socket.emit('join_connection', connectionId);

        socket.on('receive_message', (message: IMessage) => {
            setMessages(prev => [...prev, message]);
        });

        const fetchHistory = async () => {
            try {
                const history = await MessageService.getHistory(connectionId);
                setMessages(history);
            } catch {
                // histórico indisponível
            }
        };

        fetchHistory();

        return () => {
            getSocket()?.emit('leave_connection', connectionId);
            disconnectSocket();
        };
    }, [connectionId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        const content = input.trim();
        if (!content) return;

        getSocket()?.emit('send_message', { connectionId, receiverId, content });
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {messages.map(msg => (
                    <div
                        key={msg.id}
                        className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                            msg.senderId === currentUserId
                                ? 'self-end bg-action-primary text-white'
                                : 'self-start bg-bg-primary text-color-logo'
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex gap-2 p-4 border-t border-details-primary/40">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Digite uma mensagem..."
                    className="flex-1 rounded-full border border-details-primary px-4 py-2 text-sm text-color-logo outline-none placeholder:text-text-primary focus:border-action-primary"
                />
                <button
                    onClick={sendMessage}
                    className="rounded-full bg-action-primary px-5 py-2 text-sm text-white transition-colors hover:brightness-95 cursor-pointer"
                >
                    Enviar
                </button>
            </div>
        </div>
    );
}