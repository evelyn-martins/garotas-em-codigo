import { useEffect, useState } from 'react';
import { AreaService } from '../services/AreaService';
import type { IArea } from '../types/areas';
import AreaCard from '../components/AreaCard';

export default function TechAreas() {
    const [areas, setAreas] = useState<IArea[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const data = await AreaService.getAllAreas();
                setAreas(data);
            } catch {
                setAreas([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAreas();
    }, []);

    return (
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-color-logo">Áreas de TI</h1>
                <p className="mt-1 text-sm text-text-primary">
                    Conheça as possibilidades da área de tecnologia e encontre seu caminho.
                </p>
            </div>

            {loading ? (
                <div className="py-20 text-center text-sm text-text-primary">
                    Carregando áreas...
                </div>
            ) : areas.length === 0 ? (
                <div className="rounded-xl border border-details-primary/40 bg-white py-20 text-center">
                    <p className="text-sm font-medium text-color-logo">Nenhuma área encontrada</p>
                    <p className="mt-1 text-xs text-text-primary">
                        Volte mais tarde para explorar as áreas disponíveis.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {areas.map(area => (
                        <AreaCard key={area.id} area={area} />
                    ))}
                </div>
            )}
        </main>
    );
}
