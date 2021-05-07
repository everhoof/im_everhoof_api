"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var AccountsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const typeorm_1 = require("@nestjs/typeorm");
const tokens_repository_1 = require("./repositories/tokens.repository");
const users_repository_1 = require("../users/repositories/users.repository");
const sign_in_args_1 = require("./args/sign-in.args");
const tokens_entity_1 = require("./entities/tokens.entity");
const exceptions_1 = require("../../common/exceptions/exceptions");
const users_entity_1 = require("../users/entities/users.entity");
const sign_up_args_1 = require("./args/sign-up.args");
const roles_repository_1 = require("../roles/repositories/roles.repository");
const typeorm_2 = require("typeorm");
const confirmations_repository_1 = require("./repositories/confirmations.repository");
const confirmation_type_enum_1 = require("./types/confirmation-type.enum");
const reset_password_args_1 = require("./args/reset-password.args");
const mailer_1 = require("@nestjs-modules/mailer");
const confirm_email_args_1 = require("./args/confirm-email.args");
const oauth_repository_1 = require("./repositories/oauth.repository");
const oauth_type_enum_1 = require("./types/oauth-type.enum");
const is_username_free_args_1 = require("./args/is-username-free.args");
const update_username_args_1 = require("./args/update-username.args");
const get_token_by_discord_id_args_1 = require("./args/get-token-by-discord-id.args");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const subscription_events_1 = require("../common/types/subscription-events");
const invalidate_token_by_id_args_1 = require("./args/invalidate-token-by-id.args");
const app_roles_1 = require("../../app.roles");
let AccountsService = AccountsService_1 = class AccountsService {
    constructor(connection, tokensRepository, usersRepository, rolesRepository, oauthRepository, confirmationsRepository, mailerService, pubSub) {
        this.connection = connection;
        this.tokensRepository = tokensRepository;
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.oauthRepository = oauthRepository;
        this.confirmationsRepository = confirmationsRepository;
        this.mailerService = mailerService;
        this.pubSub = pubSub;
        this.logger = new common_1.Logger(AccountsService_1.name, true);
    }
    async validateUserByEmailAndPassword(args) {
        const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
        if (!user || !user.salt || !user.hash)
            throw new exceptions_1.UnauthorizedException('WRONG_CREDENTIALS');
        const isPasswordValid = this.checkSaltHash(args.password, user.salt, user.hash);
        if (!isPasswordValid)
            throw new exceptions_1.UnauthorizedException('WRONG_CREDENTIALS');
        const token = await this.tokensRepository.createNewToken(user.id);
        if (!token)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        return token;
    }
    async validateUserByToken(value) {
        const token = await this.tokensRepository.getTokenByValue(value);
        if (!token)
            throw null;
        token.usedAt = new Date();
        await this.connection.transaction(async (entityManager) => {
            await entityManager.update(users_entity_1.User, {
                id: token.ownerId,
            }, {
                wasOnlineAt: new Date(),
            });
            await entityManager.save(tokens_entity_1.Token, token);
        });
        return token;
    }
    async validateUserByDiscord(accessToken, refreshToken, profile) {
        let newUser = false;
        let oauth = await this.oauthRepository.findOne({
            where: { externalId: profile['id'], type: oauth_type_enum_1.OAuthType.discord },
        });
        if (!oauth) {
            let user;
            if (profile['email']) {
                user = await this.usersRepository.findOne({ where: { email: profile['email'] } });
            }
            if (!user) {
                user = this.usersRepository.create({
                    email: profile['email'],
                    emailConfirmed: true,
                });
                user = await this.usersRepository.save(user);
                newUser = true;
            }
            oauth = this.oauthRepository.create({
                type: oauth_type_enum_1.OAuthType.discord,
                externalId: profile['id'],
                accessToken,
                refreshToken,
                userId: user.id,
                data: profile,
            });
            oauth = await this.oauthRepository.save(oauth);
        }
        const token = await this.tokensRepository.createNewToken(oauth.userId);
        if (!token)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        if (newUser)
            await this.pubSub.publish("userRegisteredViaDiscord", {
                ["userRegisteredViaDiscord"]: oauth.externalId,
            });
        return token;
    }
    async createUser(input) {
        let user = await this.usersRepository.getUserByEmailAndUsername(input.email, input.username);
        if (user) {
            if (input.username && (input.username === user.username || input.username === user.email)) {
                throw new exceptions_1.BadRequestException('USERNAME_OCCUPIED');
            }
            else {
                throw new exceptions_1.BadRequestException('EMAIL_OCCUPIED');
            }
        }
        const { salt, hash } = this.createSaltHash(input.password);
        user = await this.usersRepository.createNewUser({ ...input, salt, hash });
        const role = await this.rolesRepository.getDefaultRole();
        user.roles = [role];
        const result = await Promise.all([
            await this.usersRepository.saveAndReturn(user),
            await this.requestEmailConfirmation(user),
        ]);
        return result[0];
    }
    async requestEmailConfirmation(user) {
        if (user.emailConfirmed)
            throw new exceptions_1.BadRequestException('EMAIL_ALREADY_CONFIRMED');
        const confirmation = await this.confirmationsRepository.createNewConfirmation(user.id, confirmation_type_enum_1.ConfirmationType.registration);
        this.sendConfirmationEmail({
            email: user.email,
            name: user.username || 'user',
            token: confirmation.value,
        }).catch((e) => this.logger.error(e));
        return user;
    }
    async requestPasswordReset(args) {
        const user = await this.usersRepository.getUserByEmailOrUsername(args.email);
        if (!user)
            return true;
        const confirmation = await this.confirmationsRepository.createNewConfirmation(user.id, confirmation_type_enum_1.ConfirmationType.password);
        this.sendPasswordResetEmail({
            email: user.email,
            name: user.username || 'user',
            token: confirmation.value,
        }).catch((e) => this.logger.error(e));
        return true;
    }
    async sendConfirmationEmail(args) {
        await this.mailerService.sendMail({
            to: args.email,
            subject: 'Подтверждение E-mail',
            template: 'confirm-email',
            context: {
                email: args.email,
                name: args.name,
                link: `${process.env.PUBLIC_URL}/confirm_email?code=${args.token}`,
            },
        });
    }
    async sendPasswordResetEmail(args) {
        await this.mailerService.sendMail({
            to: args.email,
            subject: 'Сброс пароля',
            template: 'reset-password',
            context: {
                email: args.email,
                name: args.name,
                link: `${process.env.PUBLIC_URL}/reset_password?code=${args.token}`,
            },
        });
    }
    async confirmEmail(args) {
        const confirmation = await this.confirmationsRepository.getConfirmationByValue(args.token);
        if (!confirmation)
            throw new exceptions_1.BadRequestException('CONFIRMATION_IS_INVALID');
        const user = await this.usersRepository.findOne(confirmation.userId);
        if (!user)
            throw new exceptions_1.BadRequestException('CONFIRMATION_IS_INVALID');
        await this.confirmationsRepository.delete(confirmation.id);
        user.emailConfirmed = true;
        await this.usersRepository.saveAndReturn(user);
        const token = await this.tokensRepository.createNewToken(user.id);
        if (!token)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        return token;
    }
    async resetPassword(args) {
        const confirmation = await this.confirmationsRepository.getConfirmationByValue(args.token);
        if (!confirmation)
            throw new exceptions_1.BadRequestException('CONFIRMATION_IS_INVALID');
        const user = await this.usersRepository.findOne(confirmation.userId);
        if (!user)
            throw new exceptions_1.BadRequestException('CONFIRMATION_IS_INVALID');
        const { salt, hash } = this.createSaltHash(args.password);
        user.salt = salt;
        user.hash = hash;
        await Promise.all([
            this.confirmationsRepository.delete(confirmation.id),
            this.usersRepository.save(user),
            this.tokensRepository.expireUserTokens(user.id),
        ]);
        const token = await this.tokensRepository.createNewToken(user.id);
        if (!token)
            throw new exceptions_1.InternalServerErrorException('UNKNOWN');
        return token;
    }
    async isUsernameFree(args) {
        return !(await this.usersRepository.findOne({ where: { username: args.username } }));
    }
    async updateUsername(args, user) {
        const free = await this.isUsernameFree({ username: args.username });
        if (!free)
            throw new exceptions_1.BadRequestException('USERNAME_OCCUPIED');
        await this.usersRepository.update({ id: user.id }, { username: args.username });
        return this.usersRepository.isExist(user.id);
    }
    async getTokenByDiscordId(args) {
        const oauth = await this.oauthRepository.findOne({ where: { externalId: args.id, type: oauth_type_enum_1.OAuthType.discord } });
        if (!oauth)
            return;
        return this.tokensRepository.createNewToken(oauth.userId);
    }
    async invalidateTokenById(args, user) {
        const token = await this.tokensRepository.isExist(args.id);
        if (token.ownerId !== user.id && !user.roleNames.includes(app_roles_1.AppRoles.ADMIN))
            throw new exceptions_1.BadRequestException('FORBIDDEN');
        await this.tokensRepository.delete(token.id);
        return true;
    }
    async invalidateAllTokens(user) {
        await this.tokensRepository.delete({ ownerId: user.id });
        return true;
    }
    async getTokens(user) {
        return this.tokensRepository.find({ where: { ownerId: user.id } });
    }
    createSaltHash(password) {
        const salt = crypto_1.randomBytes(48).toString('base64');
        const hash = crypto_1.pbkdf2Sync(password, salt, 10, 48, 'sha512').toString('base64');
        return { salt, hash };
    }
    checkSaltHash(password, salt, hash) {
        if (!password || !hash || !salt)
            return false;
        const userHash = crypto_1.pbkdf2Sync(password, salt, 10, 48, 'sha512').toString('base64');
        return userHash === hash;
    }
};
AccountsService = AccountsService_1 = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectConnection()),
    __param(1, typeorm_1.InjectRepository(tokens_repository_1.TokensRepository)),
    __param(2, typeorm_1.InjectRepository(users_repository_1.UsersRepository)),
    __param(3, typeorm_1.InjectRepository(roles_repository_1.RolesRepository)),
    __param(4, typeorm_1.InjectRepository(oauth_repository_1.OAuthRepository)),
    __param(5, typeorm_1.InjectRepository(confirmations_repository_1.ConfirmationsRepository)),
    __param(7, common_1.Inject('PUB_SUB')),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        tokens_repository_1.TokensRepository,
        users_repository_1.UsersRepository,
        roles_repository_1.RolesRepository,
        oauth_repository_1.OAuthRepository,
        confirmations_repository_1.ConfirmationsRepository,
        mailer_1.MailerService,
        graphql_subscriptions_1.PubSub])
], AccountsService);
exports.AccountsService = AccountsService;
//# sourceMappingURL=accounts.service.js.map