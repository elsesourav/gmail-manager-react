import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';

interface FormDialogProps {
    open: boolean;
    title: string;
    onClose: () => void;
    onSubmit: () => void;
    children: React.ReactNode;
}

const FormDialog: React.FC<FormDialogProps> = ({
    open,
    title,
    onClose,
    onSubmit,
    children,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={onSubmit} variant="contained">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormDialog;
