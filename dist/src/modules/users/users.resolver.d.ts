import { User } from '@modules/users/entities/users.entity';
import { Picture } from '@modules/pictures/entities/pictures.entity';
import DataLoader from 'dataloader';
export declare class UsersResolver {
    avatar(user: User, picturesLoader: DataLoader<Picture['id'], Picture>): Promise<Nullable<Picture>>;
    getCurrentUser(user: User): Promise<User>;
}
