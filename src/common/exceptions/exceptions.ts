import { HttpException, HttpStatus } from '@nestjs/common';

export type ExceptionMessage = 'en' | 'ru';

export type ExceptionKey =
  | 'UNKNOWN'
  | 'FORBIDDEN'
  | 'USER_DOES_NOT_EXIST'
  | 'USER_DOES_NOT_EXIST_WITH_ID'
  | 'USERNAME_OCCUPIED'
  | 'EMAIL_OCCUPIED'
  | 'WRONG_CREDENTIALS'
  | 'NO_FILE_PROVIDED'
  | 'CANNOT_CREATE_EMPTY_MESSAGE';

type Exception = {
  [key in ExceptionKey]: { [key in ExceptionMessage]: string };
};

const exceptions: Exception = {
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

function createExceptionMessage(exception: ExceptionKey, lang: ExceptionMessage = 'en', args: string[] = []): string {
  if (exceptions[exception] && exceptions[exception][lang]) {
    const message = exceptions[exception][lang];
    return args.reduce((acc, arg) => acc.replace(/%[a-zA-Z0-9_\-.]+%/, arg), message);
  }
  return 'An unknown error occurred';
}

export class CustomHttpException extends HttpException {
  public readonly exception: ExceptionKey;
  public readonly lang: ExceptionMessage;
  public readonly args: string[];

  constructor(status: number, exception: ExceptionKey, args: string[], lang: ExceptionMessage = 'en') {
    const message = createExceptionMessage(exception, lang, args);
    super(
      {
        statusCode: status,
        error: exception,
        message,
        lang,
        args,
      },
      status,
    );
    this.exception = exception;
    this.lang = lang;
    this.args = args;
  }
}

export class UnauthorizedException extends CustomHttpException {
  constructor(exception: ExceptionKey, ...args: string[]) {
    super(HttpStatus.UNAUTHORIZED, exception, args);
  }
}

export class BadRequestException extends CustomHttpException {
  constructor(exception: ExceptionKey, ...args: string[]) {
    super(HttpStatus.BAD_REQUEST, exception, args);
  }
}

export class InternalServerErrorException extends CustomHttpException {
  constructor(exception: ExceptionKey, ...args: string[]) {
    super(HttpStatus.INTERNAL_SERVER_ERROR, exception, args);
  }
}
