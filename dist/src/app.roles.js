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
exports.roles.grant(AppRoles.USER);
exports.roles.grant(AppRoles.ADMIN).readAny('message').deleteAny('message');
//# sourceMappingURL=app.roles.js.map