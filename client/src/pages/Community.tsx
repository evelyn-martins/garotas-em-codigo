import { useEffect, useRef, useState, useCallback } from 'react';
import { LuPlus } from 'react-icons/lu';
import { PostService, type IPostFeedWithLikes } from '../services/PostService';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';

const LIMIT = 10;

export default function Community() {
    const [posts, setPosts] = useState<IPostFeedWithLikes[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const pageRef = useRef(1);
    const fetchingRef = useRef(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const fetchPage = useCallback(async (page: number) => {
        if (fetchingRef.current) return;
        fetchingRef.current = true;
        if (page === 1) setLoading(true);
        else setLoadingMore(true);
        try {
            const { posts: data, hasMore: more } = await PostService.getPosts(page, LIMIT);
            setPosts(prev => (page === 1 ? data : [...prev, ...data]));
            setHasMore(more);
            pageRef.current = page;
        } catch {
            if (page === 1) setPosts([]);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            fetchingRef.current = false;
        }
    }, []);

    useEffect(() => {
        fetchPage(1);
    }, [fetchPage]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel || !hasMore) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !fetchingRef.current) {
                    fetchPage(pageRef.current + 1);
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, fetchPage]);

    const handlePostCreated = (post: IPostFeedWithLikes) => {
        setPosts(prev => [post, ...prev]);
        setShowModal(false);
    };

    const handlePostUpdated = (updated: IPostFeedWithLikes) => {
        setPosts(prev => prev.map(p => (p.id === updated.id ? { ...p, ...updated } : p)));
    };

    const handlePostDeleted = (postId: string) => {
        setPosts(prev => prev.filter(p => p.id !== postId));
    };

    return (
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <section>
                <h2 className="mb-4 text-base font-bold text-color-logo">Comunidade</h2>

                {loading ? (
                    <div className="py-16 text-center text-sm text-text-primary">
                        Carregando posts...
                    </div>
                ) : posts.length === 0 ? (
                    <div className="rounded-xl border border-details-primary/40 bg-white py-16 text-center text-sm text-text-primary">
                        Nenhum post ainda. Seja a primeira a compartilhar!
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} onUpdated={handlePostUpdated} onDeleted={handlePostDeleted} />
                        ))}
                        <div ref={sentinelRef} className="h-4" />
                        {loadingMore && (
                            <div className="py-4 text-center text-sm text-text-primary">
                                Carregando mais...
                            </div>
                        )}
                        {!hasMore && posts.length > 0 && (
                            <div className="py-4 text-center text-xs text-text-primary">
                                Você chegou ao fim do feed.
                            </div>
                        )}
                    </div>
                )}
            </section>

            <div className="group fixed bottom-20 right-4 lg:bottom-6 lg:right-6">
                <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-color-logo px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    Criar publicação
                </span>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-action-primary text-white shadow-lg transition hover:brightness-95"
                    aria-label="Criar publicação"
                >
                    <LuPlus className="text-2xl" />
                </button>
            </div>

            {showModal && (
                <CreatePostModal
                    onClose={() => setShowModal(false)}
                    onPostCreated={handlePostCreated}
                />
            )}
        </main>
    );
}
