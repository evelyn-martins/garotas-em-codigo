import axios from 'axios';
import type {IOpportunity} from '../types/opportunity';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { Accept: 'application/json' },
});

export const OpportunityService = {
    getOpportunities: async (): Promise<IOpportunity[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/opportunities', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar oportunidades');
            }
            throw error;
        }
    },

    getOpportunitiesByArea: async (areaId: string): Promise<IOpportunity[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/opportunities/area/${areaId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar oportunidades por área');
            }
            throw error;
        }
    },
};