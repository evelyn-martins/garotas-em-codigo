import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';
import { OpportunityService } from '../services/opportunityService';
import type { IOpportunity } from '../types/opportunity';
import { AreaService } from '../services/AreaService';
import type { IArea } from '../types/areas';
import AppHeader from '../components/AppHeader';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityModal from '../components/OpportunityModal';
import OpportunityCategoryFilter, { type FilterCategory } from '../components/OpportunityCategoryFilter';
import Dropdown, { type DropdownOption } from '../components/Dropdown';

export default function Opportunities() {
    const navigate = useNavigate();
    const [opportunities, setOpportunities] = useState<IOpportunity[]>([]);
    const [areas, setAreas] = useState<IArea[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState<FilterCategory>('ALL');
    const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
    const [selectedOpportunity, setSelectedOpportunity] = useState<IOpportunity | null>(null);

    const areaOptions: DropdownOption[] = [
        { value: '', label: 'Todas as áreas' },
        ...areas.map(area => ({ value: String(area.id), label: area.name })),
    ];

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await AreaService.getAllAreas();
                setAreas(data);
            } catch {
                setAreas([]);
            }
        };

        fetchAreas();
    }, []);

    useEffect(() => {
        const fetchOpportunities = async () => {
            setLoading(true);
            try {
                const data = selectedAreaId
                    ? await OpportunityService.getOpportunitiesByArea(selectedAreaId)
                    : await OpportunityService.getOpportunities();
                setOpportunities(data);
            } catch {
                setOpportunities([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOpportunities();
    }, [selectedAreaId]);

    const filtered =
        activeCategory === 'ALL'
            ? opportunities
            : opportunities.filter(o => o.type === activeCategory);

    const handleAreaChange = (selected: string[]) => {
        const value = selected[0];
        setSelectedAreaId(value ? Number(value) : null);
    };

    return (
        <div className="min-h-screen bg-bg-primary/30">
            <AppHeader />

            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                <div className="relative mb-8 flex flex-col items-center text-center">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="absolute left-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-details-primary/60 bg-white text-text-primary transition-colors hover:border-action-primary/60 hover:text-color-logo"
                    >
                        <LuArrowLeft className="text-sm" />
                    </button>
                    <h1 className="text-2xl font-bold text-color-logo">Oportunidades</h1>
                    <p className="mt-1 text-sm text-text-primary">
                        Explore eventos, bolsas, cursos e vagas de emprego na área de TI.
                    </p>
                </div>

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <OpportunityCategoryFilter active={activeCategory} onChange={setActiveCategory} />

                    <div className="w-full sm:w-52">
                        <Dropdown
                            options={areaOptions}
                            values={selectedAreaId !== null ? [String(selectedAreaId)] : []}
                            onChange={handleAreaChange}
                            placeholder="Filtrar por área"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-sm text-text-primary">
                        Carregando oportunidades...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-xl border border-details-primary/40 bg-white py-20 text-center">
                        <p className="text-sm font-medium text-color-logo">Nenhuma oportunidade encontrada</p>
                        <p className="mt-1 text-xs text-text-primary">
                            Tente mudar os filtros ou volte mais tarde.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map(opportunity => (
                            <OpportunityCard
                                key={opportunity.id}
                                opportunity={opportunity}
                                onClick={() => setSelectedOpportunity(opportunity)}
                            />
                        ))}
                    </div>
                )}
            </main>

            {selectedOpportunity && (
                <OpportunityModal
                    opportunity={selectedOpportunity}
                    onClose={() => setSelectedOpportunity(null)}
                />
            )}
        </div>
    );
}
