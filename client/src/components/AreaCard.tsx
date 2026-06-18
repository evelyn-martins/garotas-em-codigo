import { LuMonitor } from 'react-icons/lu';
import type { IArea } from '../types/areas';

interface AreaCardProps {
    area: IArea;
}

export default function AreaCard({ area }: AreaCardProps) {
    return (
        <article className="group flex flex-col rounded-2xl border border-details-primary bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-action-primary/40 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-action-primary/10">
                <LuMonitor className="text-xl text-action-primary" />
            </div>

            <h3 className="text-sm font-bold text-color-logo">{area.name}</h3>

            {area.description && (
                <p className="mt-2 line-clamp-3 text-xs leading-5 text-text-primary">
                    {area.description}
                </p>
            )}
        </article>
    );
}