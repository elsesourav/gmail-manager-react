import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface ActionButtonProps extends ButtonProps {
    children: React.ReactNode;
    startIcon?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    children,
    startIcon,
    ...props
}) => {
    return (
        <Button
            variant="contained"
            color="primary"
            startIcon={startIcon}
            {...props}
        >
            {children}
        </Button>
    );
};

export default ActionButton;
