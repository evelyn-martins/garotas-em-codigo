import type { IInspiration } from '../types/inspiration';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface InspirationCardProps {
    inspiration: IInspiration;
}

export default function InspirationCard({ inspiration }: InspirationCardProps) {
    return (
        <article className="flex flex-col items-center rounded-2xl border border-details-primary/40 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-action-primary/40 hover:shadow-md">
            <div className="mb-3 flex h-18 w-18 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-action-primary/15 ring-4 ring-action-primary/10">
                {inspiration.image ? (
                    <img
                        src={inspiration.image}
                        alt={inspiration.name}
                        className="h-full w-full rounded-full object-cover"
                    />
                ) : (
                    <span className="text-xl font-bold text-action-primary">
                        {getInitials(inspiration.name)}
                    </span>
                )}
            </div>

            <h3 className="text-sm font-bold text-color-logo">{inspiration.name}</h3>
            <p className="mt-0.5 text-xs font-medium text-action-primary">{inspiration.subtitle}</p>

            <p className="mt-3 text-xs leading-5 text-text-primary wrap-break-word">
                {inspiration.description}
            </p>
        </article>
    );
}
