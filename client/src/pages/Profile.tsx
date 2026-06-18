import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserService } from '../services/UserService';
import { PostService, type IPostFeedWithLikes } from '../services/PostService';
import type { IUserProfile } from '../types/user';
import ProfileHeader from '../components/ProfileHeader';
import PostCard from '../components/PostCard';

export default function Profile() {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [profile, setProfile] = useState<IUserProfile | null>(null);
    const [posts, setPosts] = useState<IPostFeedWithLikes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const isOwnProfile = !!user && user.id === userId;

    useEffect(() => {
        if (!userId) return;
        const loadData = async () => {
            setLoading(true);
            setError('');
            try {
                const [profileData, postsData] = await Promise.all([
                    UserService.getUserById(userId),
                    PostService.getPostsByUser(userId),
                ]);
                setProfile(profileData);
                setPosts(postsData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Erro ao carregar o perfil.');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [userId]);

    if (loading) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
                <div className="py-20 text-center text-sm text-text-primary">Carregando perfil...</div>
            </main>
        );
    }

    if (error || !profile) {
        return (
            <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
                <div className="rounded-2xl border border-details-primary/40 bg-white py-20 text-center">
                    <p className="text-sm font-medium text-color-logo">{error || 'Perfil não encontrado'}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 cursor-pointer rounded-xl bg-action-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
                    >
                        Voltar ao início
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
            <ProfileHeader
                profile={profile}
                isOwnProfile={isOwnProfile}
                onEdit={() => navigate('/editar-perfil')}
            />

            <section className="mt-8">
                <h2 className="mb-4 text-base font-bold text-color-logo">Publicações</h2>

                {posts.length === 0 ? (
                    <div className="rounded-xl border border-details-primary/40 bg-white py-16 text-center text-sm text-text-primary">
                        {isOwnProfile
                            ? 'Você ainda não publicou nada.'
                            : `${profile.name} ainda não publicou nada.`}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
