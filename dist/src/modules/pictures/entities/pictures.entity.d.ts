import { PictureRepresentation } from '@modules/pictures/entities/picture-representations.entity';
import { User } from '@modules/users/entities/users.entity';
import { Message } from '@modules/messages/entities/messages.entity';
export declare class Picture {
    readonly id: number;
    ownerId: Nullable<number>;
    sId: number;
    mId: number;
    oId: number;
    createdAt: Date;
    updatedAt: Date;
    s: PictureRepresentation;
    m: PictureRepresentation;
    o: PictureRepresentation;
    owner: Nullable<User>;
    avatars: User[];
    messages: Message[];
}
