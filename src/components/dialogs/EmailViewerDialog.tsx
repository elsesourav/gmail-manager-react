import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Box,
    Chip,
} from '@mui/material';
import { Email } from '../../types';

interface EmailViewerDialogProps {
    email: Email | null;
    open: boolean;
    onClose: () => void;
}

const EmailViewerDialog: React.FC<EmailViewerDialogProps> = ({
    email,
    open,
    onClose,
}) => {
    if (!email) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>
                <Box display="flex" alignItems="center" gap={1}>
                    {email.subject}
                    {email.isStarred && (
                        <Chip label="Starred" color="warning" size="small" />
                    )}
                </Box>
            </DialogTitle>
            <DialogContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    From: {email.from}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Date: {new Date(email.date).toLocaleString()}
                </Typography>
                <Box mt={2}>
                    <Typography
                        dangerouslySetInnerHTML={{ __html: email.body || '' }}
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EmailViewerDialog;
