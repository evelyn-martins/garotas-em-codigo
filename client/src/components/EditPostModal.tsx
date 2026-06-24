import { useState, useEffect, useRef } from 'react';
import { LuX } from 'react-icons/lu';
import { PostService, type IPostFeedWithLikes } from '../services/PostService';

const MAX_CHARS = 280;

interface EditPostModalProps {
    post: IPostFeedWithLikes;
    onClose: () => void;
    onPostUpdated: (post: IPostFeedWithLikes) => void;
}

export default function EditPostModal({ post, onClose, onPostUpdated }: EditPostModalProps) {
    const [content, setContent] = useState(post.content);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        textareaRef.current?.focus();
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const remaining = MAX_CHARS - content.length;
    const isOverLimit = remaining < 0;

    const handleSubmit = async () => {
        const trimmed = content.trim();
        if (!trimmed) {
            setError('O post não pode estar vazio.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const updated = await PostService.updatePost(post.id, trimmed);
            onPostUpdated({ ...post, ...updated });
        } catch {
            setError('Erro ao editar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-base font-bold text-color-logo">Editar publicação</h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-details-primary/60 text-text-primary transition-colors hover:border-action-primary/60 hover:text-color-logo"
                    >
                        <LuX className="text-sm" />
                    </button>
                </div>

                <textarea
                    ref={textareaRef}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="O que você quer compartilhar?"
                    rows={4}
                    maxLength={MAX_CHARS}
                    className="w-full resize-none rounded-xl border border-details-primary bg-bg-primary/30 px-4 py-3 text-sm text-color-logo placeholder:text-text-primary/60 outline-none transition focus:border-action-primary"
                />

                <div className="mt-1 flex items-center justify-between">
                    {error ? (
                        <p className="text-xs text-red-400">{error}</p>
                    ) : (
                        <span />
                    )}
                    <span className={`text-xs ${isOverLimit ? 'text-red-400' : remaining <= 40 ? 'text-amber-500' : 'text-text-primary'}`}>
                        {remaining} caracteres restantes
                    </span>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer rounded-lg px-4 py-2 text-xs font-medium text-text-primary transition-colors hover:text-color-logo"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || !content.trim() || isOverLimit}
                        className="cursor-pointer rounded-lg bg-action-primary px-5 py-2 text-xs font-semibold text-white transition disabled:opacity-50 hover:brightness-95"
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
