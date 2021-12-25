"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = exports.ThrottlerExceptionFilter = exports.GraphqlExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const exceptions_1 = require("../exceptions/exceptions");
const throttler_1 = require("@nestjs/throttler");
let GraphqlExceptionFilter = class GraphqlExceptionFilter {
    catch(exception, host) {
        const gqlHost = graphql_1.GqlArgumentsHost.create(host);
        let lang = 'en';
        if (gqlHost.getContext().req) {
            lang = gqlHost.getContext().req.query.lang || lang;
        }
        else {
            lang = host.switchToHttp().getRequest().query.lang || lang;
        }
        return new exceptions_1.CustomHttpException(exception.getStatus(), exception.exception, exception.args, lang);
    }
};
GraphqlExceptionFilter = __decorate([
    common_1.Catch(exceptions_1.CustomHttpException)
], GraphqlExceptionFilter);
exports.GraphqlExceptionFilter = GraphqlExceptionFilter;
let ThrottlerExceptionFilter = class ThrottlerExceptionFilter {
    catch(exception, host) {
        const gqlHost = graphql_1.GqlArgumentsHost.create(host);
        let lang = 'en';
        if (gqlHost.getContext().req) {
            lang = gqlHost.getContext().req.query.lang || lang;
        }
        else {
            lang = host.switchToHttp().getRequest().query.lang || lang;
        }
        return new exceptions_1.CustomHttpException(429, 'RATE_LIMIT_REACHED', [], lang);
    }
};
ThrottlerExceptionFilter = __decorate([
    common_1.Catch(throttler_1.ThrottlerException)
], ThrottlerExceptionFilter);
exports.ThrottlerExceptionFilter = ThrottlerExceptionFilter;
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const lang = request.query.lang || 'en';
        const translatedException = new exceptions_1.CustomHttpException(exception.getStatus(), exception.exception, exception.args, lang);
        response.status(status).json(translatedException.getResponse());
    }
};
HttpExceptionFilter = __decorate([
    common_1.Catch(exceptions_1.CustomHttpException)
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map