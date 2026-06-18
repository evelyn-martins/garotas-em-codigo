import axios from 'axios';
import type { IInspiration } from '../types/inspiration';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Accept: 'application/json' },
});

export const InspirationService = {
    getInspirations: async (): Promise<IInspiration[]> => {
        try {
            const response = await api.get('/inspirations');
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar referências');
            }
            throw error;
        }
    },
};
