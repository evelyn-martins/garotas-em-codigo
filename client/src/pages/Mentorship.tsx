import { useCallback, useEffect, useState } from 'react';
import { LuCheck } from 'react-icons/lu';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';
import { ConnectionService } from '../services/ConnectionService';
import type { IGuide } from '../types/user';
import type { IPendingConnection, IActiveConnection } from '../types/connection';
import { AreaService } from '../services/AreaService';
import type { IArea } from '../types/areas';
import GuideCard from '../components/GuideCard';
import RequestMentorshipModal from '../components/RequestMentorshipModal';
import ConnectionRequestCard from '../components/ConnectionRequestCard';
import ActiveConnectionCard from '../components/ActiveConnectionCard';
import Dropdown, { type DropdownOption } from '../components/Dropdown';

export default function Mentorship() {
    const { user } = useAuth();
    const [guides, setGuides] = useState<IGuide[]>([]);
    const [areas, setAreas] = useState<IArea[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

    const [selectedGuide, setSelectedGuide] = useState<IGuide | null>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const [pending, setPending] = useState<IPendingConnection[]>([]);
    const [active, setActive] = useState<IActiveConnection[]>([]);
    const [processingId, setProcessingId] = useState<string | null>(null);

    const isGuide = user?.role === 'GUIDE';

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
        const fetchGuides = async () => {
            setLoading(true);
            try {
                const data = selectedAreaId
                    ? await UserService.getGuidesByArea(selectedAreaId)
                    : await UserService.getGuides();
                setGuides(data);
            } catch {
                setGuides([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, [selectedAreaId]);

    const loadConnections = useCallback(async () => {
        try {
            const [activeData, pendingData] = await Promise.all([
                ConnectionService.getActiveConnections(),
                isGuide ? ConnectionService.getPendingConnections() : Promise.resolve([]),
            ]);
            setActive(activeData);
            setPending(pendingData);
        } catch {
            setActive([]);
            setPending([]);
        }
    }, [isGuide]);

    useEffect(() => {
        loadConnections();
    }, [loadConnections]);

    const handleAreaChange = (selected: string[]) => {
        const value = selected[0];
        setSelectedAreaId(prev => (prev === value || !value ? null : value));
    };

    const handleRequestSuccess = () => {
        setSelectedGuide(null);
        setSuccessMessage('Solicitação de mentoria enviada com sucesso!');
        setTimeout(() => setSuccessMessage(''), 4000);
    };

    const handleAccept = async (connectionId: string) => {
        setProcessingId(connectionId);
        try {
            await ConnectionService.acceptConnection(connectionId);
            await loadConnections();
        } catch {
            setProcessingId(null);
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (connectionId: string) => {
        setProcessingId(connectionId);
        try {
            await ConnectionService.rejectConnection(connectionId);
            await loadConnections();
        } catch {
            setProcessingId(null);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-color-logo">Mentoria Colaborativa</h1>
                <p className="mt-1 text-sm text-text-primary">
                    Conecte-se com guias experientes e acelere seu crescimento na tecnologia.
                </p>
            </div>

            {successMessage && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <LuCheck className="shrink-0 text-base" />
                    {successMessage}
                </div>
            )}

            {isGuide && pending.length > 0 && (
                <section className="mb-10">
                    <h2 className="mb-4 text-lg font-bold text-color-logo">Solicitações pendentes</h2>
                    <div className="flex flex-col gap-3">
                        {pending.map(connection => (
                            <ConnectionRequestCard
                                key={connection.id}
                                connection={connection}
                                onAccept={handleAccept}
                                onReject={handleReject}
                                processing={processingId === connection.id}
                            />
                        ))}
                    </div>
                </section>
            )}

            {active.length > 0 && (
                <section className="mb-10">
                    <h2 className="mb-4 text-lg font-bold text-color-logo">Minhas mentorias</h2>
                    <div className="flex flex-col gap-3">
                        {active.map(connection => (
                            <ActiveConnectionCard
                                key={connection.id}
                                connection={connection}
                                currentUserId={user?.id ?? ''}
                            />
                        ))}
                    </div>
                </section>
            )}

            <section>
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-bold text-color-logo">Encontre uma guia</h2>
                    <div className="w-full sm:w-52">
                        <Dropdown
                            options={areaOptions}
                            values={selectedAreaId !== null ? [selectedAreaId] : []}
                            onChange={handleAreaChange}
                            placeholder="Filtrar por área"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 text-center text-sm text-text-primary">
                        Carregando guias...
                    </div>
                ) : guides.length === 0 ? (
                    <div className="rounded-xl border border-details-primary/40 bg-white py-20 text-center">
                        <p className="text-sm font-medium text-color-logo">Nenhuma guia disponível no momento</p>
                        <p className="mt-1 text-xs text-text-primary">
                            Tente mudar o filtro ou volte mais tarde.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {guides.map(guide => (
                            <GuideCard key={guide.id} guide={guide} onRequest={setSelectedGuide} />
                        ))}
                    </div>
                )}
            </section>

            {selectedGuide && (
                <RequestMentorshipModal
                    guide={selectedGuide}
                    onClose={() => setSelectedGuide(null)}
                    onSuccess={handleRequestSuccess}
                />
            )}
        </main>
    );
}
