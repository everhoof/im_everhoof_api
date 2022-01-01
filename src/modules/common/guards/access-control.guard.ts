import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ACGuard as OriginalACGuard } from 'nest-access-control';
import { User } from '@modules/users/entities/users.entity';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ACGuard extends OriginalACGuard {
  private static getRequest(context: ExecutionContext): Request {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  protected async getUser(context: ExecutionContext): Promise<User> {
    const request = ACGuard.getRequest(context);
    if (!request.user) throw new UnauthorizedException();
    return request.user as User;
  }

  protected async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
    const user = await this.getUser(context);
    return user.roles.map((roles) => roles.name);
  }
}
