import { useEffect, useState } from 'react';
import { InspirationService } from '../services/InspirationService';
import type { IInspiration } from '../types/inspiration';
import InspirationCard from '../components/InspirationCard';

export default function Inspirations() {
    const [inspirations, setInspirations] = useState<IInspiration[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInspirations = async () => {
            setLoading(true);
            try {
                const data = await InspirationService.getInspirations();
                setInspirations(data);
            } catch {
                setInspirations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchInspirations();
    }, []);

    return (
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="mb-8 flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-color-logo">Referências Femininas</h1>
                <p className="mt-1 text-sm text-text-primary">
                    Conheça mulheres inspiradoras que fizeram história na tecnologia.
                </p>
            </div>

            {loading ? (
                <div className="py-20 text-center text-sm text-text-primary">
                    Carregando referências...
                </div>
            ) : inspirations.length === 0 ? (
                <div className="rounded-xl border border-details-primary/40 bg-white py-20 text-center">
                    <p className="text-sm font-medium text-color-logo">Nenhuma referência encontrada</p>
                    <p className="mt-1 text-xs text-text-primary">
                        Volte mais tarde para conferir novas referências.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {inspirations.map(inspiration => (
                        <InspirationCard key={inspiration.id} inspiration={inspiration} />
                    ))}
                </div>
            )}
        </main>
    );
}
