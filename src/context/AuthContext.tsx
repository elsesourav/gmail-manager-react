import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authApi } from '../services/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Verify token and get user data
            setLoading(false);
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await authApi.login(email, password);
            localStorage.setItem('token', response.token);
            setUser(response.user);
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const response = await authApi.register(email, password);
            localStorage.setItem('token', response.token);
            setUser(response.user);
        } catch (error) {
            throw new Error('Registration failed');
        }
    };

    const logout = async () => {
        try {
            await authApi.logout();
            localStorage.removeItem('token');
            setUser(null);
        } catch (error) {
            throw new Error('Logout failed');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
