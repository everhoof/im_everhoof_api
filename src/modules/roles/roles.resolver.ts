import { Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { GraphqlExceptionFilter } from '@common/filters/http-exception.filter';

@UseFilters(GraphqlExceptionFilter)
@Resolver('Roles')
export class RolesResolver {}
