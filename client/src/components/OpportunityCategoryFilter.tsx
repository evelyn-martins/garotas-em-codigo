import { LuCalendar, LuGraduationCap, LuBookOpen, LuBriefcase, LuLayoutGrid } from 'react-icons/lu';
import type { IOpportunity } from '../types/opportunity';

export type FilterCategory = IOpportunity['type'] | 'ALL';

const CATEGORIES: { value: FilterCategory; label: string; icon: React.ElementType }[] = [
    { value: 'ALL', label: 'Todas', icon: LuLayoutGrid },
    { value: 'EVENT', label: 'Eventos', icon: LuCalendar },
    { value: 'SCHOLARSHIP', label: 'Bolsas', icon: LuGraduationCap },
    { value: 'COURSE', label: 'Cursos', icon: LuBookOpen },
    { value: 'JOB', label: 'Vagas', icon: LuBriefcase },
];

interface OpportunityCategoryFilterProps {
    active: FilterCategory;
    onChange: (category: FilterCategory) => void;
}

export default function OpportunityCategoryFilter({ active, onChange }: OpportunityCategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(({ value, label, icon: Icon }) => (
                <button
                    key={value}
                    onClick={() => onChange(value)}
                    className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                        active === value
                            ? 'bg-action-primary text-white shadow-sm'
                            : 'border border-details-primary/60 bg-white text-text-primary hover:border-action-primary/60 hover:text-color-logo'
                    }`}
                >
                    <Icon className="text-sm" />
                    {label}
                </button>
            ))}
        </div>
    );
}