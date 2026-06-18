import { useNavigate } from 'react-router-dom';
import { LuTag, LuUsers } from 'react-icons/lu';
import type { IGuide } from '../types/user';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface GuideCardProps {
    guide: IGuide;
    onRequest: (guide: IGuide) => void;
}

export default function GuideCard({ guide, onRequest }: GuideCardProps) {
    const navigate = useNavigate();
    const goToProfile = () => navigate(`/perfil/${guide.id}`);

    return (
        <article className="group flex flex-col items-center rounded-2xl border border-details-primary/40 bg-white p-6 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-action-primary/40 hover:shadow-md">
            <button
                onClick={goToProfile}
                aria-label={`Ver perfil de ${guide.name}`}
                className="mb-3 flex h-18 w-18 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-white bg-action-primary/15 ring-4 ring-action-primary/10 transition hover:ring-action-primary/30"
            >
                {guide.image ? (
                    <img
                        src={guide.image}
                        alt={guide.name}
                        className="h-full w-full rounded-full object-cover"
                    />
                ) : (
                    <span className="text-xl font-bold text-action-primary">
                        {getInitials(guide.name)}
                    </span>
                )}
            </button>

            <button
                onClick={goToProfile}
                className="cursor-pointer text-sm font-bold text-color-logo transition-colors hover:text-action-primary"
            >
                {guide.name}
            </button>
            <p className="mt-0.5 text-xs text-text-primary">@{guide.username}</p>

            {guide.areas.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                    {guide.areas.map(({ area }) => (
                        <span
                            key={area.id}
                            className="flex items-center gap-1 rounded-full bg-bg-primary px-2.5 py-0.5 text-xs font-medium text-color-logo"
                        >
                            <LuTag className="text-xs" />
                            {area.name}
                        </span>
                    ))}
                </div>
            )}

            {guide.description && (
                <p className="mt-3 line-clamp-3 text-xs leading-5 text-text-primary">
                    {guide.description}
                </p>
            )}

            <button
                onClick={() => onRequest(guide)}
                className="mt-4 flex cursor-pointer items-center gap-1.5 rounded-full bg-action-primary/10 px-4 py-1.5 text-xs font-semibold text-action-primary transition-all hover:bg-action-primary/20 lg:opacity-0 lg:group-hover:opacity-100"
            >
                <LuUsers className="text-sm" />
                Solicitar mentoria
            </button>
        </article>
    );
}
