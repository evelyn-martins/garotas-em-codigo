import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Accept: 'application/json' },
});

export const MessageService = {
    getHistory: async (connectionId: string) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/messages/${connectionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.messages;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar mensagens');
            }
            throw error;
        }
    },
};