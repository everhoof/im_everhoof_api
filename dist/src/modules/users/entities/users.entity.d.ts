import { Token } from '@modules/accounts/entities/tokens.entity';
import { Role } from '@modules/roles/entities/roles.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import { Punishment } from '@modules/users/entities/punishments.entity';
import { Confirmation } from '@modules/accounts/entities/confirmations.entity';
export declare class User {
    readonly id: number;
    email: string;
    username?: string;
    avatarId: Nullable<number>;
    salt?: string;
    hash?: string;
    emailConfirmed: boolean;
    wasOnlineAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    tokens: Token[];
    avatar: Nullable<Picture>;
    messages: Message[];
    pictures: Picture[];
    punishments: Punishment[];
    executedPunishments: Punishment[];
    canceledPunishments: Punishment[];
    confirmations: Confirmation[];
    roles: Role[];
    get roleNames(): string[];
}
