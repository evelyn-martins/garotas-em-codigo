import { LuCalendar, LuGraduationCap, LuBookOpen, LuBriefcase, LuTag } from 'react-icons/lu';
import type { IOpportunity } from '../types/opportunity';

const CATEGORY_CONFIG: Record<IOpportunity['type'], {
    label: string;
    icon: React.ElementType;
    accent: string;
    iconBg: string;
    iconColor: string;
    badge: string;
}> = {
    EVENT: {
        label: 'Evento',
        icon: LuCalendar,
        accent: 'bg-action-primary',
        iconBg: 'bg-action-primary/15',
        iconColor: 'text-action-primary',
        badge: 'bg-action-primary/15 text-action-primary',
    },
    SCHOLARSHIP: {
        label: 'Bolsa',
        icon: LuGraduationCap,
        accent: 'bg-color-logo',
        iconBg: 'bg-color-logo/10',
        iconColor: 'text-color-logo',
        badge: 'bg-color-logo/10 text-color-logo',
    },
    COURSE: {
        label: 'Curso',
        icon: LuBookOpen,
        accent: 'bg-details-primary',
        iconBg: 'bg-details-primary/40',
        iconColor: 'text-color-logo',
        badge: 'bg-details-primary/40 text-color-logo',
    },
    JOB: {
        label: 'Vaga',
        icon: LuBriefcase,
        accent: 'bg-action-primary/70',
        iconBg: 'bg-bg-primary',
        iconColor: 'text-action-primary',
        badge: 'bg-bg-primary text-action-primary',
    },
};

interface OpportunityCardProps {
    opportunity: IOpportunity;
    onClick: () => void;
}

export default function OpportunityCard({ opportunity, onClick }: OpportunityCardProps) {
    const config = CATEGORY_CONFIG[opportunity.type];
    const Icon = config.icon;

    const formattedDate = new Date(opportunity.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });

    return (
        <article
            onClick={onClick}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-details-primary/40 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-action-primary/40 hover:shadow-lg"
        >
            <div className={`h-1 w-full ${config.accent}`} />

            <div className="flex flex-1 flex-col p-5">
                <div className="mb-4 flex items-start justify-between gap-2">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.iconBg}`}>
                        <Icon className={`text-xl ${config.iconColor}`} />
                    </div>
                    <span className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.badge}`}>
                        {config.label}
                    </span>
                </div>

                <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-color-logo">
                    {opportunity.title}
                </h3>

                <p className="mb-4 grow line-clamp-3 text-xs leading-relaxed text-text-primary">
                    {opportunity.description || 'Sem descrição disponível.'}
                </p>

                <div className="flex items-end justify-between border-t border-details-primary/30 pt-3">
                    <div className="flex flex-col gap-0.5">
                        {opportunity.area && (
                            <span className="flex items-center gap-1 text-xs text-text-primary">
                                <LuTag className="shrink-0 text-xs" />
                                {opportunity.area.name}
                            </span>
                        )}
                        <span className="text-xs text-text-primary">{formattedDate}</span>
                    </div>
                    <span className="text-xs font-medium text-action-primary opacity-0 transition-opacity group-hover:opacity-100">
                        Ver mais →
                    </span>
                </div>
            </div>
        </article>
    );
}
