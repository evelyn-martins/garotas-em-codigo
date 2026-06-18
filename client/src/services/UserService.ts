import axios from 'axios';
import type { IGuide, IUserUpdate, IUserProfile } from '../types/user';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: 'application/json',
    },
});

export const UserService = {
    update: async (userData: IUserUpdate) => {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        if (userData.name !== undefined) formData.append('name', userData.name);
        if (userData.username !== undefined) formData.append('username', userData.username);
        if (userData.email !== undefined) formData.append('email', userData.email);
        if (userData.description !== undefined && userData.description !== null) {
            formData.append('description', userData.description);
        }
        if (userData.image !== undefined && userData.image !== null) {
            formData.append('image', userData.image);
        }
        try {
            const response = await api.put('/user/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
            }
            throw error;
        }
    },
    getProfile: async (userId: string) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar usuário');
            }
            throw error;
        }
    },
    updateProfile: async (formData: FormData) => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.put('/user/profile', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
            }
            throw error;
        }
    },
    getMyProfile: async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.user;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar perfil');
            }
            throw error;
        }
    },
    getUserById: async (userId: string): Promise<IUserProfile> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/user/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.user;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar perfil');
            }
            throw error;
        }
    },
    getGuides: async (): Promise<IGuide[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get('/user/guides', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.guides;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar guias');
            }
            throw error;
        }
    },
    getGuidesByArea: async (areaId: string): Promise<IGuide[]> => {
        const token = localStorage.getItem('token');
        try {
            const response = await api.get(`/user/guides/area/${areaId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data.guides;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.message || 'Erro ao buscar guias por área');
            }
            throw error;
        }
    },
}