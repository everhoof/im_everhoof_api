"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const typeorm_2 = require("./config/typeorm");
const nest_access_control_1 = require("nest-access-control");
const app_roles_1 = require("./app.roles");
const schedule_1 = require("@nestjs/schedule");
const users_module_1 = require("./modules/users/users.module");
const accounts_module_1 = require("./modules/accounts/accounts.module");
const roles_module_1 = require("./modules/roles/roles.module");
const app_resolver_1 = require("./app.resolver");
const pictures_module_1 = require("./modules/pictures/pictures.module");
const messages_module_1 = require("./modules/messages/messages.module");
const upload_module_1 = require("./modules/upload/upload.module");
const core_1 = require("@nestjs/core");
const nestjs_graphql_dataloader_1 = require("@intelrug/nestjs-graphql-dataloader");
const common_module_1 = require("./modules/common/common.module");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
            graphql_1.GraphQLModule.forRoot({
                debug: process.env.NODE_ENV !== 'production',
                autoSchemaFile: path_1.join(process.cwd(), './graphql/schema.graphql'),
                installSubscriptionHandlers: true,
                subscriptions: {
                    onConnect: (connectionParams, websocket) => {
                        return {
                            headers: {
                                ...(websocket?.upgradeReq?.headers || {}),
                                authorization: connectionParams?.['Authorization'] || undefined,
                            },
                        };
                    },
                },
                context: ({ req, connection }) => ({
                    req: connection?.context || req,
                    connection,
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: typeorm_2.TypeOrmConfigService,
            }),
            mailer_1.MailerModule.forRoot({
                transport: process.env.EMAIL_TRANSPORT,
                defaults: {
                    from: `${process.env.EMAIL_DISPLAY_NAME} <${process.env.EMAIL_DISPLAY_EMAIL}>`,
                },
                template: {
                    dir: process.cwd() + '/mail/templates',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            nest_access_control_1.AccessControlModule.forRoles(app_roles_1.roles),
            schedule_1.ScheduleModule.forRoot(),
            common_module_1.CommonModule,
            users_module_1.UsersModule,
            accounts_module_1.AccountsModule,
            roles_module_1.RolesModule,
            pictures_module_1.PicturesModule,
            messages_module_1.MessagesModule,
            upload_module_1.UploadModule,
        ],
        providers: [
            app_resolver_1.AppResolver,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: nestjs_graphql_dataloader_1.DataLoaderInterceptor,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map