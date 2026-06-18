import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LuArrowLeft, LuSend, LuTag } from 'react-icons/lu';
import { useAuth } from '../contexts/AuthContext';
import { ConnectionService } from '../services/ConnectionService';
import { MessageService } from '../services/MessageService';
import { connectSocket } from '../services/Socket';
import type { IActiveConnection, IConnectionParticipant } from '../types/connection';
import type { IMessage } from '../types/message';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

export default function Chat() {
    const { connectionId } = useParams<{ connectionId: string }>();
    const navigate = useNavigate();
    const { user, token } = useAuth();

    const [connection, setConnection] = useState<IActiveConnection | null>(null);
    const [counterpart, setCounterpart] = useState<IConnectionParticipant | null>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!connectionId) return;
        const loadData = async () => {
            setLoading(true);
            try {
                const [conn, history] = await Promise.all([
                    ConnectionService.getConnection(connectionId),
                    MessageService.getHistory(connectionId),
                ]);
                setConnection(conn);
                setCounterpart(conn.requester.id === user?.id ? conn.receiver : conn.requester);
                setMessages(history);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar a conversa.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [connectionId, user?.id]);

    useEffect(() => {
        if (!connectionId || !token) return;
        const socket = connectSocket(token);
        socket.emit('join_connection', connectionId);

        const handleReceive = (message: IMessage) => {
            if (message.connectionId === connectionId) {
                setMessages(prev => [...prev, message]);
            }
        };
        socket.on('receive_message', handleReceive);

        return () => {
            socket.emit('leave_connection', connectionId);
            socket.off('receive_message', handleReceive);
        };
    }, [connectionId, token]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = content.trim();
        if (!trimmed || !connectionId || !counterpart || !token) return;
        const socket = connectSocket(token);
        socket.emit('send_message', {
            connectionId,
            receiverId: counterpart.id,
            content: trimmed,
        });
        setContent('');
    };

    if (loading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center text-sm text-text-primary lg:h-screen">
                Carregando conversa...
            </div>
        );
    }

    if (error || !connection || !counterpart) {
        return (
            <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center gap-3 px-4 text-center lg:h-screen">
                <p className="text-sm font-medium text-color-logo">{error || 'Conversa não encontrada'}</p>
                <button
                    onClick={() => navigate('/mentoria')}
                    className="cursor-pointer rounded-xl bg-action-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                >
                    Voltar para Mentoria
                </button>
            </div>
        );
    }

    return (
        <div className="flex h-[calc(100vh-4rem)] flex-col lg:h-screen">
            <header className="flex shrink-0 items-center gap-3 border-b border-details-primary/40 bg-white px-4 py-3">
                <button
                    onClick={() => navigate('/mentoria')}
                    aria-label="Voltar"
                    className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-primary/60 hover:text-color-logo"
                >
                    <LuArrowLeft className="text-base" />
                </button>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-action-primary/15">
                    {counterpart.image ? (
                        <img src={counterpart.image} alt={counterpart.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <span className="text-sm font-bold text-action-primary">{getInitials(counterpart.name)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-color-logo">{counterpart.name}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-text-primary">
                        <LuTag className="text-xs" />
                        {connection.area.name}
                    </span>
                </div>
            </header>

            <div className="flex-1 overflow-y-auto bg-bg-primary/30 px-4 py-4">
                <div className="mx-auto flex max-w-2xl flex-col gap-2">
                    {messages.length === 0 ? (
                        <p className="py-20 text-center text-sm text-text-primary">
                            Nenhuma mensagem ainda. Diga olá!
                        </p>
                    ) : (
                        messages.map(message => {
                            const isMine = message.senderId === user?.id;
                            return (
                                <div
                                    key={message.id}
                                    className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm wrap-break-word ${isMine
                                            ? 'rounded-br-sm bg-action-primary text-white'
                                            : 'rounded-bl-sm border border-details-primary/40 bg-white text-color-logo'
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            <form
                onSubmit={handleSend}
                className="flex shrink-0 items-center gap-2 border-t border-details-primary/40 bg-white px-4 py-3"
            >
                <input
                    type="text"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    className="flex-1 rounded-full border border-details-primary bg-bg-primary/30 px-4 py-2.5 text-sm text-color-logo placeholder:text-text-primary/60 outline-none transition focus:border-action-primary"
                />
                <button
                    type="submit"
                    disabled={!content.trim()}
                    aria-label="Enviar"
                    className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-action-primary text-white transition hover:brightness-95 disabled:opacity-50"
                >
                    <LuSend className="text-base" />
                </button>
            </form>
        </div>
    );
}
