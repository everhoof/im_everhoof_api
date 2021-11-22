"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableException = exports.UnsupportedMediaTypeException = exports.InternalServerErrorException = exports.BadRequestException = exports.UnauthorizedException = exports.CustomHttpException = void 0;
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
    USER_ALREADY_PUNISHED: {
        en: 'User already punished',
        ru: 'Пользователь уже наказан',
    },
    USER_IS_NOT_PUNISHED: {
        en: 'User is not punished',
        ru: 'Пользователь ещё не наказан',
    },
    USERNAME_OCCUPIED: {
        en: 'This username is already occupied',
        ru: 'Это имя пользователя уже занято',
    },
    EMAIL_OCCUPIED: {
        en: 'This email is already occupied',
        ru: 'Этот электронный адрес уже используется',
    },
    USERNAME_BLACKLISTED: {
        en: 'This username has blocked',
        ru: 'Нельзя использовать это имя',
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
    YOU_ARE_MUTED: {
        en: 'You are muted',
        ru: 'Вы заглушены',
    },
    YOU_ARE_BANNED: {
        en: 'You are muted',
        ru: 'Вы забанены',
    },
    IMAGE_CORRUPTED: {
        en: 'Image corrupted',
        ru: 'Изображение повреждено',
    },
    IMAGE_DIMENSIONS_TOO_LARGE: {
        en: 'Image dimensions too large',
        ru: 'Разрешение изображения слишком большое',
    },
    UNSUPPORTED_MEDIA_TYPE: {
        en: 'Unsupported Media Type',
        ru: 'Неподдерживаемый тип медиа',
    },
    SERVER_IS_OVERLOADED: {
        en: 'Service is overloaded',
        ru: 'Сервер перегружен',
    },
    CONFIRMATION_IS_INVALID: {
        en: 'Confirmation is invalid',
        ru: 'Подтверждение недействительно',
    },
    EMAIL_IS_NOT_CONFIRMED: {
        en: 'E-mail is not confirmed',
        ru: 'E-mail не подтверждён',
    },
    EMAIL_ALREADY_CONFIRMED: {
        en: 'E-mail already confirmed',
        ru: 'E-mail уже подтверждён',
    },
    EMAIL_NOT_REGISTERED: {
        en: 'The user with this email address is not registered',
        ru: 'Пользователь с таким E-mail не зарегистрирован',
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
class UnsupportedMediaTypeException extends CustomHttpException {
    constructor(exception, ...args) {
        super(common_1.HttpStatus.UNSUPPORTED_MEDIA_TYPE, exception, args);
    }
}
exports.UnsupportedMediaTypeException = UnsupportedMediaTypeException;
class ServiceUnavailableException extends CustomHttpException {
    constructor(exception, ...args) {
        super(common_1.HttpStatus.SERVICE_UNAVAILABLE, exception, args);
    }
}
exports.ServiceUnavailableException = ServiceUnavailableException;
//# sourceMappingURL=exceptions.js.map