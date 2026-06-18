import { LuTag, LuCheck, LuX } from 'react-icons/lu';
import type { IPendingConnection } from '../types/connection';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface ConnectionRequestCardProps {
    connection: IPendingConnection;
    onAccept: (connectionId: string) => void;
    onReject: (connectionId: string) => void;
    processing: boolean;
}

export default function ConnectionRequestCard({ connection, onAccept, onReject, processing }: ConnectionRequestCardProps) {
    const { requester, area } = connection;

    return (
        <article className="flex flex-col gap-4 rounded-2xl border border-details-primary/40 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-action-primary/15">
                    {requester.image ? (
                        <img src={requester.image} alt={requester.name} className="h-full w-full rounded-full object-cover" />
                    ) : (
                        <span className="text-sm font-bold text-action-primary">{getInitials(requester.name)}</span>
                    )}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-color-logo">{requester.name}</p>
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-bg-primary px-2.5 py-0.5 text-xs font-medium text-color-logo">
                        <LuTag className="text-xs" />
                        {area.name}
                    </span>
                </div>
            </div>

            <div className="flex shrink-0 gap-2">
                <button
                    onClick={() => onAccept(connection.id)}
                    disabled={processing}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-action-primary px-4 py-2 text-xs font-semibold text-white transition hover:brightness-95 disabled:opacity-50 sm:flex-none"
                >
                    <LuCheck className="text-sm" />
                    Aceitar
                </button>
                <button
                    onClick={() => onReject(connection.id)}
                    disabled={processing}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-details-primary px-4 py-2 text-xs font-semibold text-text-primary transition hover:text-color-logo disabled:opacity-50 sm:flex-none"
                >
                    <LuX className="text-sm" />
                    Recusar
                </button>
            </div>
        </article>
    );
}
