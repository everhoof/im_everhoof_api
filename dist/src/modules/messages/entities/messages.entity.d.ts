import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
export declare class Message {
    readonly id: number;
    ownerId: Nullable<number>;
    content: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    pictureIds: number[];
    owner: User;
    pictures: Picture[];
}
