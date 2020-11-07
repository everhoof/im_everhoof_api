import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Resolver('App')
export class AppResolver {
  @Query(() => String)
  getHello(): string {
    return 'Hello World!';
  }
}
