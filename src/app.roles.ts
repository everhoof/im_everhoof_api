import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
  UNVERIFIED_USER = 'UNVERIFIED_USER',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(AppRoles.UNVERIFIED_USER).read('message').deleteOwn('message');
roles.grant(AppRoles.USER).extend(AppRoles.UNVERIFIED_USER);
roles.grant(AppRoles.MODERATOR).extend(AppRoles.USER).readAny('message').deleteAny('message').update('mute');
roles.grant(AppRoles.ADMIN).extend(AppRoles.MODERATOR).update('ban');
