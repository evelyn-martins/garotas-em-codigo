import { useState } from 'react';
import { LuX, LuUsers } from 'react-icons/lu';
import type { IGuide } from '../types/user';
import { ConnectionService } from '../services/ConnectionService';
import Dropdown, { type DropdownOption } from './Dropdown';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface RequestMentorshipModalProps {
    guide: IGuide;
    onClose: () => void;
    onSuccess: () => void;
}

export default function RequestMentorshipModal({ guide, onClose, onSuccess }: RequestMentorshipModalProps) {
    const [selectedArea, setSelectedArea] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const areaOptions: DropdownOption[] = guide.areas.map(({ area }) => ({
        value: area.id,
        label: area.name,
    }));

    const handleAreaChange = (selected: string[]) => {
        setSelectedArea(prev => (prev[0] === selected[0] ? [] : [selected[0]]));
        setError('');
    };

    const handleConfirm = async () => {
        if (selectedArea.length === 0) {
            setError('Selecione uma área de interesse.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await ConnectionService.createConnection(guide.id, selectedArea[0]);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao solicitar mentoria.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-2xl border border-details-primary/40 bg-white p-6 shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Fechar"
                    className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-primary/60 hover:text-color-logo"
                >
                    <LuX className="text-base" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-action-primary/15 ring-4 ring-action-primary/10">
                        {guide.image ? (
                            <img src={guide.image} alt={guide.name} className="h-full w-full rounded-full object-cover" />
                        ) : (
                            <span className="text-lg font-bold text-action-primary">{getInitials(guide.name)}</span>
                        )}
                    </div>
                    <h2 className="text-lg font-bold text-color-logo">Solicitar mentoria</h2>
                    <p className="mt-0.5 text-sm text-text-primary">
                        com <span className="font-semibold text-color-logo">{guide.name}</span>
                    </p>
                </div>

                <div className="mt-6 flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-color-logo">Área de interesse</label>
                    <Dropdown
                        options={areaOptions}
                        values={selectedArea}
                        onChange={handleAreaChange}
                        placeholder="Selecione uma área..."
                        disabled={areaOptions.length === 0}
                    />
                    {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading}
                        className="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:text-color-logo disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={loading}
                        className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-action-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-50"
                    >
                        <LuUsers className="text-sm" />
                        {loading ? 'Enviando...' : 'Confirmar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
