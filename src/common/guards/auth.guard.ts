import { Reflector } from '@nestjs/core';
import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as BasicAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { AccountsService } from '@modules/accounts/accounts.service';

function canActivate(context: ExecutionContext, optional = false): boolean {
  const request = this.getRequest(context);

  if (!request || !request.user || request.user === -1) {
    if (optional) {
      if (request?.user === -1) throw new UnauthorizedException();
      return true;
    }
    throw new UnauthorizedException();
  }
  return true;
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
    return canActivate.call(this, context);
  }
}

/**
 * Throws Unauthorized exception only if token is passed and is invalid
 */
@Injectable()
export class OptionalGqlAuthGuard extends BasicAuthGuard(['bearer-no-exception', 'anonymous']) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    return canActivate.call(this, context, true);
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
