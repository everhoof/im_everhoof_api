import { HttpException } from '@nestjs/common';
export declare type ExceptionMessage = 'en' | 'ru';
export declare type ExceptionKey = 'UNKNOWN' | 'FORBIDDEN' | 'USER_DOES_NOT_EXIST' | 'USER_DOES_NOT_EXIST_WITH_ID' | 'USER_ALREADY_PUNISHED' | 'USER_IS_NOT_PUNISHED' | 'USERNAME_OCCUPIED' | 'EMAIL_OCCUPIED' | 'WRONG_CREDENTIALS' | 'NO_FILE_PROVIDED' | 'CANNOT_CREATE_EMPTY_MESSAGE';
export declare class CustomHttpException extends HttpException {
    readonly exception: ExceptionKey;
    readonly lang: ExceptionMessage;
    readonly args: string[];
    constructor(status: number, exception: ExceptionKey, args: string[], lang?: ExceptionMessage);
}
export declare class UnauthorizedException extends CustomHttpException {
    constructor(exception: ExceptionKey, ...args: string[]);
}
export declare class BadRequestException extends CustomHttpException {
    constructor(exception: ExceptionKey, ...args: string[]);
}
export declare class InternalServerErrorException extends CustomHttpException {
    constructor(exception: ExceptionKey, ...args: string[]);
}
