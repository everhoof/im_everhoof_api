import { User } from '@modules/users/entities/users.entity';
import { OAuthType } from '@modules/accounts/types/oauth-type.enum';
export declare class OAuth {
    readonly id: number;
    accessToken: string;
    refreshToken: string;
    userId: number;
    type: OAuthType;
    user: User;
    externalId: string;
    data: Record<string, unknown>;
}
