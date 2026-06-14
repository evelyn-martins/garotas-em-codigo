import { useEffect } from 'react';
import { LuX, LuCalendar, LuGraduationCap, LuBookOpen, LuBriefcase, LuExternalLink, LuTag } from 'react-icons/lu';
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

interface OpportunityModalProps {
    opportunity: IOpportunity;
    onClose: () => void;
}

export default function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
    const config = CATEGORY_CONFIG[opportunity.type];
    const Icon = config.icon;

    const formattedDate = new Date(opportunity.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <div className={`h-1.5 w-full ${config.accent}`} />

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-bg-primary text-text-primary transition-colors hover:bg-action-primary/20 hover:text-color-logo"
                >
                    <LuX className="text-sm" />
                </button>

                <div className="p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${config.iconBg}`}>
                            <Icon className={`text-2xl ${config.iconColor}`} />
                        </div>
                        <span className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.badge}`}>
                            {config.label}
                        </span>
                    </div>

                    <h2 className="mb-4 text-lg font-bold leading-snug text-color-logo">
                        {opportunity.title}
                    </h2>

                    <div className="mb-4 border-t border-details-primary/30" />

                    <p className="mb-6 max-h-48 overflow-y-auto text-sm leading-relaxed text-text-primary">
                        {opportunity.description || 'Sem descrição disponível.'}
                    </p>

                    <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-text-primary">
                        {opportunity.area && (
                            <span className="flex items-center gap-1.5">
                                <LuTag className="text-action-primary" />
                                {opportunity.area.name}
                            </span>
                        )}
                        <span className="flex items-center gap-1.5">
                            <LuCalendar className="text-action-primary" />
                            {formattedDate}
                        </span>
                    </div>

                    {opportunity.link ? (
                        <a
                            href={opportunity.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-action-primary py-2.5 text-sm font-semibold text-white transition-all hover:brightness-95"
                        >
                            Acessar oportunidade <LuExternalLink />
                        </a>
                    ) : (
                        <div className="rounded-xl bg-bg-primary/60 py-2.5 text-center text-xs text-text-primary">
                            Nenhum link disponível para esta oportunidade.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
