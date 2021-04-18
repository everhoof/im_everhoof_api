import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER",
    UNVERIFIED_USER = "UNVERIFIED_USER"
}
export declare enum RoleResources {
    MESSAGE = "message",
    MUTE = "mute",
    BAN = "ban",
    USER_SETTINGS = "user-settings"
}
export declare const roles: RolesBuilder;
