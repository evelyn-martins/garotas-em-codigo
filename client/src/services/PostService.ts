import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Accept: 'application/json' },
});

export interface IPostFeed {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        username: string;
        image: string | null;
    };
}

export interface IPostFeedWithLikes extends IPostFeed {
    likesCount: number;
    likedByMe: boolean;
}

export const PostService = {
    getPosts: async (page: number, limit: number): Promise<{ posts: IPostFeedWithLikes[]; hasMore: boolean }> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/posts', {
                params: { page, limit },
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar posts');
            }
            throw error;
        }
    },
    getPostsByUser: async (userId: string): Promise<IPostFeedWithLikes[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/posts/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar posts da usuária');
            }
            throw error;
        }
    },
    createPost: async (content: string): Promise<IPostFeedWithLikes> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.post('/posts/create', { content }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { ...response.data, likesCount: 0, likedByMe: false };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao criar post');
            }
            throw error;
        }
    },
    likePost: async (postId: string): Promise<void> => {
        const token = localStorage.getItem('token');
        try {
            await api.post(`/posts/${postId}/like`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao curtir post');
            }
            throw error;
        }
    },
    unlikePost: async (postId: string): Promise<void> => {
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/posts/${postId}/unlike`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao descurtir post');
            }
            throw error;
        }
    },
    updatePost: async (postId: string, content: string): Promise<IPostFeedWithLikes> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put(`/posts/update/${postId}`, { content }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao editar post');
            }
            throw error;
        }
    },
    deletePost: async (postId: string): Promise<void> => {
        const token = localStorage.getItem('token');
        try {
            await api.delete(`/posts/delete/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao excluir post');
            }
            throw error;
        }
    },
    getPostLikes: async (postId: string): Promise<number> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/posts/${postId}/likes`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.likes;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar curtidas');
            }
            throw error;
        }
    },
};
