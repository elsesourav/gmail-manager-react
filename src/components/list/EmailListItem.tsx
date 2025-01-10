import React from 'react';
import {
    ListItem,
    ListItemText,
    IconButton,
    Chip,
    Box,
} from '@mui/material';
import {
    Star as StarIcon,
    StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import { Email } from '../../types';

interface EmailListItemProps {
    email: Email;
    onSelect: (email: Email) => void;
    onToggleStar: (uid: string, isStarred: boolean) => void;
}

const EmailListItem: React.FC<EmailListItemProps> = ({
    email,
    onSelect,
    onToggleStar,
}) => {
    return (
        <ListItem
            button
            onClick={() => onSelect(email)}
            divider
            sx={{
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <IconButton
                size="small"
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleStar(email.uid, !email.isStarred);
                }}
            >
                {email.isStarred ? (
                    <StarIcon color="warning" />
                ) : (
                    <StarBorderIcon />
                )}
            </IconButton>
            <ListItemText
                primary={
                    <Box display="flex" alignItems="center" gap={1}>
                        {email.subject}
                        {email.isUnread && (
                            <Chip
                                label="New"
                                color="primary"
                                size="small"
                            />
                        )}
                    </Box>
                }
                secondary={`${email.from} - ${new Date(
                    email.date
                ).toLocaleString()}`}
            />
        </ListItem>
    );
};

export default EmailListItem;
