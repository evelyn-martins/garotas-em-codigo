import { useNavigate } from 'react-router-dom';
import { LuTag, LuMessagesSquare } from 'react-icons/lu';
import type { IActiveConnection } from '../types/connection';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface ActiveConnectionCardProps {
    connection: IActiveConnection;
    currentUserId: string;
}

export default function ActiveConnectionCard({ connection, currentUserId }: ActiveConnectionCardProps) {
    const navigate = useNavigate();
    const counterpart = connection.requester.id === currentUserId ? connection.receiver : connection.requester;

    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-details-primary/40 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-action-primary/15">
                    {counterpart.image ? (
                        <img src={counterpart.image} alt={counterpart.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <span className="text-sm font-bold text-action-primary">{getInitials(counterpart.name)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-color-logo">{counterpart.name}</p>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-bg-primary px-2.5 py-0.5 text-xs font-medium text-color-logo">
                        <LuTag className="text-xs" />
                        {connection.area.name}
                    </span>
                </div>
            </div>

            <button
                onClick={() => navigate(`/chat/${connection.id}`)}
                className="flex shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-action-primary px-4 py-2 text-xs font-semibold text-white transition hover:brightness-95"
            >
                <LuMessagesSquare className="text-sm" />
                Ir para o Chat
            </button>
        </article>
    );
}
