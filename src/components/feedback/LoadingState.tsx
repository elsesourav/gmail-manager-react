import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingStateProps {
    message?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({
    message = 'Loading...',
}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight={200}
        >
            <CircularProgress size={40} sx={{ mb: 2 }} />
            <Typography color="text.secondary">{message}</Typography>
        </Box>
    );
};

export default LoadingState;
