import { ExecutionContext } from '@nestjs/common';
import { ACGuard as OriginalACGuard } from 'nest-access-control';
import { User } from '@modules/users/entities/users.entity';
export declare class ACGuard extends OriginalACGuard {
    private static getRequest;
    protected getUser(context: ExecutionContext): Promise<User>;
    protected getUserRoles(context: ExecutionContext): Promise<string | string[]>;
}
