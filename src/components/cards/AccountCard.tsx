import React from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
} from '@mui/material';
import { Delete as DeleteIcon, Mail as MailIcon } from '@mui/icons-material';
import { GmailAccount } from '../../types';

interface AccountCardProps {
    account: GmailAccount;
    onDelete: (accountId: string) => void;
    onViewInbox: (accountId: string) => void;
}

const AccountCard: React.FC<AccountCardProps> = ({
    account,
    onDelete,
    onViewInbox,
}) => {
    return (
        <Card>
            <CardHeader
                title={account.email}
                subheader={`Last synced: ${new Date(
                    account.lastSynced
                ).toLocaleString()}`}
            />
            <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                    Statistics
                </Typography>
                <List>
                    <ListItem>
                        <ListItemText
                            primary="Total Emails"
                            secondary={account.totalEmails}
                        />
                        <ListItemSecondaryAction>
                            <IconButton
                                edge="end"
                                onClick={() => onViewInbox(account.id)}
                            >
                                <MailIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                onClick={() => onDelete(account.id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
};

export default AccountCard;
