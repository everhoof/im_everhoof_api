import { Query, Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@modules/common/filters/http-exception.filter';
import { join } from 'path';
import { readFileSync } from 'fs';

@UseFilters(HttpExceptionFilter)
@Resolver('App')
export class AppResolver {
  @Query(() => String)
  getHello(): string {
    return 'Hello World!';
  }

  @Query(() => String)
  async version(): Promise<string> {
    try {
      const versionFile = join(__dirname, '..', 'version.json');
      const versionData = JSON.parse(readFileSync(versionFile, 'utf8'));
      return versionData.version;
    } catch {
      return 'development';
    }
  }
}
