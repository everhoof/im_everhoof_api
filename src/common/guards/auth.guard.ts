import { Reflector } from '@nestjs/core';
import { createParamDecorator, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard as BasicAuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

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
