import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import {GraphqlExceptionFilter, ThrottlerExceptionFilter} from '@common/filters/http-exception.filter';
import { roles } from '../../app.roles';

@UseFilters(GraphqlExceptionFilter, ThrottlerExceptionFilter)
@Resolver('Roles')
export class RolesResolver {
  @Query(() => String)
  getGrants(): string {
    return JSON.stringify(roles.getGrants());
  }
}
