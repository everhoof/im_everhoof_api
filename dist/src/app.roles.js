"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = exports.AppRoles = void 0;
const nest_access_control_1 = require("nest-access-control");
var AppRoles;
(function (AppRoles) {
    AppRoles["ADMIN"] = "ADMIN";
    AppRoles["MODERATOR"] = "MODERATOR";
    AppRoles["USER"] = "USER";
    AppRoles["UNVERIFIED_USER"] = "UNVERIFIED_USER";
})(AppRoles = exports.AppRoles || (exports.AppRoles = {}));
exports.roles = new nest_access_control_1.RolesBuilder();
exports.roles.grant(AppRoles.UNVERIFIED_USER).read('message').deleteOwn('message');
exports.roles.grant(AppRoles.USER).extend(AppRoles.UNVERIFIED_USER);
exports.roles.grant(AppRoles.MODERATOR).extend(AppRoles.USER).readAny('message').deleteAny('message').update('mute');
exports.roles.grant(AppRoles.ADMIN).extend(AppRoles.MODERATOR).update('ban');
//# sourceMappingURL=app.roles.js.map