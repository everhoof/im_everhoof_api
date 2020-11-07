import { User } from '@modules/users/entities/users.entity';
export declare class Role {
    readonly id: number;
    name: string;
    users: Promise<User[]>;
}
