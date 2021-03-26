import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
export declare class Message {
    readonly id: number;
    ownerId: Nullable<number>;
    randomId: Nullable<string>;
    system: boolean;
    content: string;
    username: string;
    deletedById: Nullable<number>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Nullable<Date>;
    pictureIds: number[];
    owner: User;
    deletedBy: User;
    pictures: Picture[];
}
