import { Reflector } from '@nestjs/core';
import { CanActivate, createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as BasicAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AccountsService } from '@modules/accounts/accounts.service';

function canActivate(context: ExecutionContext): boolean {
  const request = this.getRequest(context);
  return !(!request || !request.user);
}

@Injectable()
export class GqlAuthGuard extends BasicAuthGuard('bearer') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    return canActivate.call(this, context, this.reflector);
  }
}

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private accountsService: AccountsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient();
    const cookies: string[] = client.handshake.headers.cookie.split('; ');
    const token = cookies.find((cookie) => cookie.startsWith('token'))?.split('=')[1];
    if (!token) return false;
    const tokenEntity = await this.accountsService.validateUserByToken(decodeURIComponent(token));
    if (!tokenEntity) return false;
    context.switchToWs().getData().user = tokenEntity.owner;
    return true;
  }
}

@Injectable()
export class AuthGuard extends BasicAuthGuard('bearer') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    return canActivate.call(this, context, this.reflector);
  }
}

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});

export const WsAuthenticatedUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  return context.switchToWs().getData().user;
});
