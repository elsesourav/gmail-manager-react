import React from 'react';
import { Paper, Typography, Box, Alert } from '@mui/material';

interface AuthCardProps {
    title: string;
    error?: string;
    children: React.ReactNode;
    onSubmit: (e: React.FormEvent) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
    title,
    error,
    children,
    onSubmit,
}) => {
    return (
        <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                {title}
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={onSubmit}>
                {children}
            </Box>
        </Paper>
    );
};

export default AuthCard;
