import { Global, Module } from '@nestjs/common';

import { configProvider } from './providers';

@Global()
@Module({
  providers: [configProvider],
  exports: [configProvider],
})
export class ConfigModule {}
