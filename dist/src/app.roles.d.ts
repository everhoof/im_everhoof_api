import { RolesBuilder } from 'nest-access-control';
export declare enum AppRoles {
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR",
    USER = "USER",
    UNVERIFIED_USER = "UNVERIFIED_USER"
}
export declare const roles: RolesBuilder;
