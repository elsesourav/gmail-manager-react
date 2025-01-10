import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
    children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...props }) => {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            {...props}
        >
            {children}
        </Button>
    );
};

export default SubmitButton;
