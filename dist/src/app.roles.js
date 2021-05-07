"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.RoleResources = exports.AppRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN"] = "ADMIN";
    AppRoles["MODERATOR"] = "MODERATOR";
    AppRoles["USER"] = "USER";
    AppRoles["UNVERIFIED_USER"] = "UNVERIFIED_USER";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
var RoleResources;
(function (RoleResources) {
    RoleResources["MESSAGE"] = "message";
    RoleResources["MUTE"] = "mute";
    RoleResources["BAN"] = "ban";
    RoleResources["USER_SETTINGS"] = "user-settings";
})(RoleResources = exports.RoleResources || (exports.RoleResources = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles.grant(AppRoles.UNVERIFIED_USER).read(RoleResources.MESSAGE).deleteOwn(RoleResources.MESSAGE);
exports.roles.grant(AppRoles.USER).extend(AppRoles.UNVERIFIED_USER);
exports.roles
    .grant(AppRoles.MODERATOR)
    .extend(AppRoles.USER)
    .readAny(RoleResources.MESSAGE)
    .deleteAny(RoleResources.MESSAGE)
    .update(RoleResources.MUTE)
    .readAny(RoleResources.USER_SETTINGS);
exports.roles.grant(AppRoles.ADMIN).extend(AppRoles.MODERATOR).update(RoleResources.BAN);
//# sourceMappingURL=app.roles.js.map