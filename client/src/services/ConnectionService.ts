import axios from 'axios';
import type { IPendingConnection, IActiveConnection } from '../types/connection';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});

function authHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
}

export const ConnectionService = {
    createConnection: async (guideId: string, areaId: string) => {
        try {
            const response = await api.post('/connections', { guideId, areaId }, {
                headers: authHeader(),
            });
            return response.data.connection;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao solicitar mentoria');
            }
            throw error;
        }
    },
    getPendingConnections: async (): Promise<IPendingConnection[]> => {
        try {
            const response = await api.get('/connections/pending', {
                headers: authHeader(),
            });
            return response.data.connections;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar solicitações');
            }
            throw error;
        }
    },
    getActiveConnections: async (): Promise<IActiveConnection[]> => {
        try {
            const response = await api.get('/connections/active', {
                headers: authHeader(),
            });
            return response.data.connections;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar mentorias');
            }
            throw error;
        }
    },
    getConnection: async (connectionId: string): Promise<IActiveConnection> => {
        try {
            const response = await api.get(`/connections/${connectionId}`, {
                headers: authHeader(),
            });
            return response.data.connection;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar mentoria');
            }
            throw error;
        }
    },
    acceptConnection: async (connectionId: string) => {
        try {
            const response = await api.patch(`/connections/${connectionId}/accept`, {}, {
                headers: authHeader(),
            });
            return response.data.connection;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao aceitar solicitação');
            }
            throw error;
        }
    },
    rejectConnection: async (connectionId: string) => {
        try {
            const response = await api.patch(`/connections/${connectionId}/reject`, {}, {
                headers: authHeader(),
            });
            return response.data.connection;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao recusar solicitação');
            }
            throw error;
        }
    },
};
