import { useRef, useState } from 'react';
import { LuHeart, LuEllipsis, LuPencil, LuTrash2 } from 'react-icons/lu';
import { PostService, type IPostFeedWithLikes } from '../services/PostService';
import { useAuth } from '../contexts/AuthContext';
import EditPostModal from './EditPostModal';

function getInitials(name: string) {
    return name
        .split(' ')
        .slice(0, 2)
        .map(n => n[0])
        .join('')
        .toUpperCase();
}

interface PostCardProps {
    post: IPostFeedWithLikes;
    onUpdated?: (post: IPostFeedWithLikes) => void;
    onDeleted?: (postId: string) => void;
}

export default function PostCard({ post, onUpdated, onDeleted }: PostCardProps) {
    const { user } = useAuth();
    const isOwner = !!user && user.id === post.user.id;

    const [liked, setLiked] = useState(post.likedByMe);
    const [count, setCount] = useState(post.likesCount);
    const [toggling, setToggling] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLike = async () => {
        if (toggling) return;
        setToggling(true);
        const wasLiked = liked;
        setLiked(!wasLiked);
        setCount(c => (wasLiked ? c - 1 : c + 1));
        try {
            if (wasLiked) {
                await PostService.unlikePost(post.id);
            } else {
                await PostService.likePost(post.id);
            }
        } catch {
            setLiked(wasLiked);
            setCount(c => (wasLiked ? c + 1 : c - 1));
        } finally {
            setToggling(false);
        }
    };

    const handleDelete = async () => {
        setMenuOpen(false);
        setDeleting(true);
        try {
            await PostService.deletePost(post.id);
            onDeleted?.(post.id);
        } catch {
            setDeleting(false);
        }
    };

    const handleUpdated = (updated: IPostFeedWithLikes) => {
        setShowEditModal(false);
        onUpdated?.(updated);
    };

    return (
        <>
            <article className={`rounded-xl border border-details-primary/40 bg-white p-5 text-left shadow-sm transition-opacity ${deleting ? 'opacity-50 pointer-events-none' : ''}`}>
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
                        <p className="text-sm font-semibold leading-tight text-color-logo">{post.user.name}</p>
                        <p className="text-xs text-text-primary">@{post.user.username}</p>
                    </div>
                    <span className="ml-auto text-xs text-text-primary">
                        {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                        })}
                    </span>

                    {isOwner && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setMenuOpen(o => !o)}
                                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-text-primary transition-colors hover:bg-bg-primary hover:text-color-logo"
                                aria-label="Opções do post"
                            >
                                <LuEllipsis className="text-base" />
                            </button>

                            {menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                                    <div className="absolute right-0 z-20 mt-1 w-36 rounded-xl border border-details-primary/40 bg-white py-1 shadow-lg">
                                        <button
                                            onClick={() => { setMenuOpen(false); setShowEditModal(true); }}
                                            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-xs text-color-logo transition-colors hover:bg-bg-primary"
                                        >
                                            <LuPencil className="text-sm" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-xs text-red-500 transition-colors hover:bg-red-50"
                                        >
                                            <LuTrash2 className="text-sm" />
                                            Excluir
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <p className="wrap-break-word text-sm leading-relaxed text-color-logo">{post.content}</p>

                <div className="mt-3">
                    <button
                        onClick={handleLike}
                        disabled={toggling}
                        className={`flex cursor-pointer items-center gap-1.5 text-xs transition-colors ${liked ? 'text-action-primary' : 'text-text-primary hover:text-action-primary'}`}
                    >
                        <LuHeart className={`text-sm ${liked ? 'fill-current' : ''}`} />
                        <span>{count}</span>
                    </button>
                </div>
            </article>

            {showEditModal && (
                <EditPostModal
                    post={post}
                    onClose={() => setShowEditModal(false)}
                    onPostUpdated={handleUpdated}
                />
            )}
        </>
    );
}
