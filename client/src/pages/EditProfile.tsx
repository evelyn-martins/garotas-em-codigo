import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuCheck } from 'react-icons/lu';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';
import { AreaService } from '../services/AreaService';
import { ValidateUserUpdate } from '../utils/validations';
import type { IUserUpdateErrors } from '../types/user';
import type { IArea } from '../types/areas';
import Dropdown, { type DropdownOption } from '../components/Dropdown';
import ProfileImageUpload from '../components/ProfileImageUpload';

export default function EditProfile() {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [areasOptions, setAreasOptions] = useState<DropdownOption[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
    const [loadingAreas, setLoadingAreas] = useState(true);
    const [errors, setErrors] = useState<IUserUpdateErrors>({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const [areas, profile] = await Promise.all([
                    AreaService.getAllAreas(),
                    UserService.getMyProfile(),
                ]);
                setAreasOptions(areas.map((a: IArea) => ({ value: String(a.id), label: a.name })));
                setName(profile.name);
                setUsername(profile.username);
                setEmail(profile.email);
                setDescription(profile.description || '');
                if (profile.areas) {
                    setSelectedAreas(profile.areas.map((ua: { area: { id: string } }) => ua.area.id));
                }
            } finally {
                setLoadingAreas(false);
            }
        };
        loadData();
    }, []);

    const handleImageChange = (file: File, previewUrl: string) => {
        setImageFile(file);
        setImagePreview(previewUrl);
    };

    const handleAreaChange = (value: string[]) => {
        setSelectedAreas(prev =>
            prev.includes(value[0]) ? prev.filter(v => v !== value[0]) : [...prev, value[0]]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = ValidateUserUpdate(name, username, email);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        setLoading(true);
        setApiError('');

        try {
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('username', username.trim());
            formData.append('email', email.trim());
            formData.append('description', description.trim());
            formData.append('areas', JSON.stringify(selectedAreas));
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const data = await UserService.updateProfile(formData);
            updateUser(data.user);
            setSuccess(true);
            setTimeout(() => navigate('/comunidade'), 1500);
        } catch (err) {
            setApiError(err instanceof Error ? err.message : 'Erro ao atualizar perfil. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (loadingAreas) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
                <div className="py-20 text-center text-sm text-text-primary">Carregando...</div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-color-logo">Editar Perfil</h1>
                <p className="mt-1 text-sm text-text-primary">
                    Atualize suas informações pessoais.
                </p>
            </div>

            {success && (
                <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    <LuCheck className="shrink-0 text-base" />
                    Perfil atualizado com sucesso! Redirecionando...
                </div>
            )}

            {apiError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {apiError}
                </div>
            )}

            <div className="rounded-2xl border border-details-primary/40 bg-white p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <ProfileImageUpload
                        currentImage={user?.image ?? null}
                        name={name || user?.name || ''}
                        preview={imagePreview}
                        onImageChange={handleImageChange}
                    />

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-color-logo">Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder="Seu nome completo"
                                className="rounded-xl border border-details-primary bg-bg-primary/30 px-4 py-2.5 text-sm text-color-logo placeholder:text-text-primary/60 outline-none transition focus:border-action-primary"
                            />
                            {errors.name && <p className="text-xs text-red-400">{errors.name}</p>}
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-color-logo">Usuário</label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="seuusuario"
                                className="rounded-xl border border-details-primary bg-bg-primary/30 px-4 py-2.5 text-sm text-color-logo placeholder:text-text-primary/60 outline-none transition focus:border-action-primary"
                            />
                            {errors.username && <p className="text-xs text-red-400">{errors.username}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-color-logo">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="seuemail@exemplo.com"
                            className="rounded-xl border border-details-primary bg-bg-primary/30 px-4 py-2.5 text-sm text-color-logo placeholder:text-text-primary/60 outline-none transition focus:border-action-primary"
                        />
                        {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-color-logo">Biografia</label>
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Conte um pouco sobre você..."
                            rows={3}
                            className="resize-none rounded-xl border border-details-primary bg-bg-primary/30 px-4 py-2.5 text-sm text-color-logo placeholder:text-text-primary/60 outline-none transition focus:border-action-primary"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold text-color-logo">Áreas de interesse</label>
                        <Dropdown
                            options={areasOptions}
                            values={selectedAreas}
                            onChange={handleAreaChange}
                            placeholder="Selecione uma área..."
                            disabled={areasOptions.length === 0}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate('/comunidade')}
                            disabled={loading}
                            className="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:text-color-logo disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="cursor-pointer rounded-xl bg-action-primary px-6 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 hover:brightness-95"
                        >
                            {loading ? 'Salvando...' : 'Salvar alterações'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
