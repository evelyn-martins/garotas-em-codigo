import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LuMessagesSquare,
    LuStar,
    LuMonitor,
    LuBriefcase,
    LuUsers,
    LuHeart,
    LuMessageSquare,
} from 'react-icons/lu';
import { useAuth } from '../contexts/AuthContext';
import { PostService, type IPostFeed } from '../services/PostService';
import AppHeader from '../components/AppHeader';

const NAV_FEATURES = [
    { label: 'Mentoria', description: 'Conecte-se com guias', icon: LuMessagesSquare, path: '/mentoria' },
    { label: 'Referências Femininas', description: 'Mulheres que inspiram na TI', icon: LuStar, path: '/referencias' },
    { label: 'Áreas de TI', description: 'Conheça as possibilidades', icon: LuMonitor, path: '/areas' },
    { label: 'Oportunidades', description: 'Cursos, eventos e bolsas', icon: LuBriefcase, path: '/oportunidades' },
    { label: 'Comunidade', description: 'Compartilhe experiências', icon: LuUsers, path: '/comunidade' },
];

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

function formatTime(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const h = Math.floor(diff / 3600000);
    if (h < 1) return 'Agora';
    if (h < 24) return `${h}h atrás`;
    return `${Math.floor(h / 24)}d atrás`;
}

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [posts, setPosts] = useState<IPostFeed[]>([]);
    const [loading, setLoading] = useState(true);

    const firstName = user?.name.split(' ')[0] ?? '';

    useEffect(() => {
        PostService.getAll()
            .then(setPosts)
            .catch(() => setPosts([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-bg-primary/30">
            <AppHeader />

            <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-color-logo">
                        Olá, {firstName}!
                    </h1>
                    <p className="mt-1 text-sm text-text-primary">
                        Bem-vinda de volta. Veja o que está acontecendo na comunidade hoje.
                    </p>
                </div>

                <section className="mb-8">
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                        {NAV_FEATURES.map(({ label, description, icon: Icon, path }) => (
                            <button
                                key={label}
                                onClick={() => navigate(path)}
                                className="flex flex-col items-start gap-3 rounded-xl border border-details-primary/50 bg-white p-4 text-left shadow-sm transition hover:border-action-primary/60 hover:shadow-md cursor-pointer"
                            >
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-bg-primary">
                                    <Icon className="text-lg text-action-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold leading-tight text-color-logo">{label}</p>
                                    <p className="mt-1 text-xs text-text-primary">{description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-base font-bold text-color-logo">Comunidade</h2>
                        <button
                            onClick={() => navigate('/comunidade')}
                            className="text-xs font-medium text-action-primary hover:underline cursor-pointer"
                        >
                            Ver tudo
                        </button>
                    </div>

                    {loading ? (
                        <div className="py-16 text-center text-sm text-text-primary">Carregando posts...</div>
                    ) : posts.length === 0 ? (
                        <div className="rounded-xl border border-details-primary/40 bg-white py-16 text-center text-sm text-text-primary">
                            Nenhum post ainda. Seja a primeira a compartilhar!
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {posts.map(post => (
                                <article
                                    key={post.id}
                                    className="rounded-xl border border-details-primary/40 bg-white p-5 text-left shadow-sm"
                                >
                                    <div className="mb-3 flex items-center gap-3">
                                        {post.user.image ? (
                                            <img
                                                src={post.user.image}
                                                alt={post.user.name}
                                                className="h-9 w-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-bg-primary text-xs font-bold text-action-primary">
                                                {getInitials(post.user.name)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-sm font-semibold leading-tight text-color-logo">
                                                {post.user.name}
                                            </p>
                                            <p className="text-xs text-text-primary">@{post.user.username}</p>
                                        </div>
                                        <span className="ml-auto text-xs text-text-primary">
                                            {formatTime(post.createdAt)}
                                        </span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-color-logo">{post.content}</p>
                                    <div className="mt-3 flex gap-4">
                                        <button className="flex items-center gap-1 text-xs text-text-primary hover:text-action-primary transition-colors cursor-pointer">
                                            <LuHeart className="text-sm" /> Curtir
                                        </button>
                                        <button className="flex items-center gap-1 text-xs text-text-primary hover:text-action-primary transition-colors cursor-pointer">
                                            <LuMessageSquare className="text-sm" /> Comentar
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}