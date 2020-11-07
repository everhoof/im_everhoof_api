export interface Author {
    id: string;
    username: string;
    avatar?: any;
    discriminator: string;
    public_flags: number;
}
export interface Attachment {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width: number;
    height: number;
}
export interface DiscordMessage {
    id: string;
    type: number;
    content: string;
    channel_id: string;
    author: Author;
    attachments: Attachment[];
    embeds: any[];
    mentions: any[];
    mention_roles: any[];
    pinned: boolean;
    mention_everyone: boolean;
    tts: boolean;
    timestamp: string;
    edited_timestamp?: string;
    flags: number;
    referenced_message?: string;
}
