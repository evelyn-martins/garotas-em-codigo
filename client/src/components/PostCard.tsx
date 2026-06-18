import { useState } from 'react';
import { LuHeart } from 'react-icons/lu';
import { PostService, type IPostFeedWithLikes } from '../services/PostService';

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
}

export default function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(post.likedByMe);
    const [count, setCount] = useState(post.likesCount);
    const [toggling, setToggling] = useState(false);

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

    return (
        <article className="rounded-xl border border-details-primary/40 bg-white p-5 text-left shadow-sm">
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
    );
}
