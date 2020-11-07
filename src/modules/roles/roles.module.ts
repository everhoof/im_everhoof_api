import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from '@modules/roles/repositories/roles.repository';
import { RolesService } from '@modules/roles/roles.service';
import { RolesResolver } from '@modules/roles/roles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RolesRepository])],
  providers: [RolesService, RolesResolver],
})
export class RolesModule {}
