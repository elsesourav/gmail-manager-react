import axios from 'axios';
import { AuthResponse, GmailAccount, Email } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/login', { email, password });
        return response.data;
    },

    register: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await api.post<AuthResponse>('/auth/register', { email, password });
        return response.data;
    },

    logout: async (): Promise<void> => {
        await api.post('/auth/logout');
        localStorage.removeItem('token');
    },
};

export const gmailApi = {
    addAccount: async (account: { email: string; appPassword: string }): Promise<GmailAccount> => {
        const response = await api.post('/gmail/accounts', account);
        return response.data;
    },

    removeAccount: async (email: string): Promise<void> => {
        await api.delete(`/gmail/accounts/${email}`);
    },

    deleteAccount: async (accountId: string): Promise<void> => {
        await api.delete(`/gmail/accounts/${accountId}`);
    },

    getInbox: async (email: string): Promise<Email[]> => {
        const response = await api.get(`/gmail/${email}/inbox`);
        return response.data;
    },

    getMessage: async (accountEmail: string, uid: string): Promise<Email> => {
        const response = await api.get(`/gmail/${accountEmail}/messages/${uid}`);
        return response.data;
    },

    toggleStar: async (uid: string, isStarred: boolean): Promise<void> => {
        await api.patch(`/gmail/messages/${uid}/star`, { isStarred });
    },
};

export default api;
