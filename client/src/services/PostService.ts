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

export const PostService = {
    getAll: async (): Promise<IPostFeed[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/posts', {
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
};