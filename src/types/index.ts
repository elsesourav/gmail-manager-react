export interface User {
    id: string;
    email: string;
    gmailAccounts: GmailAccount[];
}

export interface GmailAccount {
    id: string;
    email: string;
    appPassword: string;
    dateAdded: Date;
    lastSynced: Date;
    totalEmails: number;
}

export interface Email {
    uid: string;
    from: string;
    subject: string;
    date: string;
    isUnread: boolean;
    isStarred: boolean;
    body?: string;
    contentType?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiError {
    message: string;
    status?: number;
}
