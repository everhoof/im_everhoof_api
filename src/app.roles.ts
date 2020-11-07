import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
  UNVERIFIED_USER = 'UNVERIFIED_USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.USER);
