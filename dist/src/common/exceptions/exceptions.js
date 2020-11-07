"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerErrorException = exports.BadRequestException = exports.UnauthorizedException = exports.CustomHttpException = void 0;
const common_1 = require("@nestjs/common");
const exceptions = {
    UNKNOWN: {
        en: 'An unknown error occurred',
        ru: 'Произошла неизвестная ошибка',
    },
    FORBIDDEN: {
        en: 'Access to the resource is forbidden',
        ru: 'Доступ к ресурсу запрещён',
    },
    USER_DOES_NOT_EXIST: {
        en: 'User does not exist',
        ru: 'Пользователь не существует',
    },
    USER_DOES_NOT_EXIST_WITH_ID: {
        en: 'User with id %id% does not exist',
        ru: 'Пользователь с id %id% не существует',
    },
    USERNAME_OCCUPIED: {
        en: 'This username is already occupied',
        ru: 'Это имя пользователя уже занято',
    },
    EMAIL_OCCUPIED: {
        en: 'This email is already occupied',
        ru: 'Этот электронный адрес уже используется',
    },
    WRONG_CREDENTIALS: {
        en: 'Wrong credentials',
        ru: 'Неверные учётные данные',
    },
    NO_FILE_PROVIDED: {
        en: 'No file provided',
        ru: 'Не предоставлен ни один файл',
    },
    CANNOT_CREATE_EMPTY_MESSAGE: {
        en: 'Cannot create empty message',
        ru: 'Невозможно создать пустое сообщение',
    },
};
function createExceptionMessage(exception, lang = 'en', args = []) {
    if (exceptions[exception] && exceptions[exception][lang]) {
        const message = exceptions[exception][lang];
        return args.reduce((acc, arg) => acc.replace(/%[a-zA-Z0-9_\-.]+%/, arg), message);
    }
    return 'An unknown error occurred';
}
class CustomHttpException extends common_1.HttpException {
    constructor(status, exception, args, lang = 'en') {
        const message = createExceptionMessage(exception, lang, args);
        super({
            statusCode: status,
            error: exception,
            message,
            lang,
            args,
        }, status);
        this.exception = exception;
        this.lang = lang;
        this.args = args;
    }
}
exports.CustomHttpException = CustomHttpException;
class UnauthorizedException extends CustomHttpException {
    constructor(exception, ...args) {
        super(common_1.HttpStatus.UNAUTHORIZED, exception, args);
    }
}
exports.UnauthorizedException = UnauthorizedException;
class BadRequestException extends CustomHttpException {
    constructor(exception, ...args) {
        super(common_1.HttpStatus.BAD_REQUEST, exception, args);
    }
}
exports.BadRequestException = BadRequestException;
class InternalServerErrorException extends CustomHttpException {
    constructor(exception, ...args) {
        super(common_1.HttpStatus.INTERNAL_SERVER_ERROR, exception, args);
    }
}
exports.InternalServerErrorException = InternalServerErrorException;
//# sourceMappingURL=exceptions.js.map