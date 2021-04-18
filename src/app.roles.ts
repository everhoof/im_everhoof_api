import { RolesBuilder } from 'nest-access-control';
import { Role } from '@modules/roles/entities/roles.entity';

export enum AppRoles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
  UNVERIFIED_USER = 'UNVERIFIED_USER',
}

export enum RoleResources {
  MESSAGE = 'message',
  MUTE = 'mute',
  BAN = 'ban',
  USER_SETTINGS = 'user-settings',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.UNVERIFIED_USER).read(RoleResources.MESSAGE).deleteOwn(RoleResources.MESSAGE);
roles.grant(AppRoles.USER).extend(AppRoles.UNVERIFIED_USER);
roles
  .grant(AppRoles.MODERATOR)
  .extend(AppRoles.USER)
  .readAny(RoleResources.MESSAGE)
  .deleteAny(RoleResources.MESSAGE)
  .update(RoleResources.MUTE)
  .readAny(RoleResources.USER_SETTINGS);
roles.grant(AppRoles.ADMIN).extend(AppRoles.MODERATOR).update(RoleResources.BAN);
