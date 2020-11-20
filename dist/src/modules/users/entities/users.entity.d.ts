import { Token } from '@modules/accounts/entities/tokens.entity';
import { Role } from '@modules/roles/entities/roles.entity';
import { Message } from '@modules/messages/entities/messages.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
export declare class User {
    readonly id: number;
    email: string;
    username: string;
    avatarId: Nullable<number>;
    salt: string;
    hash: string;
    wasOnlineAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    tokens: Token[];
    avatar: Nullable<Picture>;
    messages: Message[];
    pictures: Picture[];
    roles: Role[];
}
