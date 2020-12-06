import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AccountsService } from '@modules/accounts/accounts.service';
declare const GqlAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GqlAuthGuard extends GqlAuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    getRequest(context: ExecutionContext): Request;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
declare const OptionalGqlAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OptionalGqlAuthGuard extends OptionalGqlAuthGuard_base {
    private readonly reflector;
    constructor(reflector: Reflector);
    getRequest(context: ExecutionContext): Request;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class WsAuthGuard implements CanActivate {
    private accountsService;
    constructor(accountsService: AccountsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
declare const AuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AuthGuard extends AuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare const CurrentUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export declare const WsAuthenticatedUser: (...dataOrPipes: unknown[]) => ParameterDecorator;
export {};
