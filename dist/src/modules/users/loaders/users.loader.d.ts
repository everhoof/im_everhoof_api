import { OrderedNestDataLoader } from '@intelrug/nestjs-graphql-dataloader';
import { UsersRepository } from '../repositories/users.repository';
import { User } from '../entities/users.entity';
export declare class UsersLoader extends OrderedNestDataLoader<User['id'], User> {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    protected getOptions: () => {
        query: (keys: Array<User['id']>) => Promise<(User & {
            id: number;
        })[]>;
    };
}
