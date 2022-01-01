import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { CustomHttpException, ExceptionMessage } from '@modules/common/exceptions/exceptions';
import { Request, Response } from 'express';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(CustomHttpException)
export class GraphqlExceptionFilter implements GqlExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost): CustomHttpException {
    const gqlHost = GqlArgumentsHost.create(host);
    let lang: ExceptionMessage = 'en';
    if (gqlHost.getContext().req) {
      lang = gqlHost.getContext().req.query.lang || lang;
    } else {
      lang = host.switchToHttp().getRequest().query.lang || lang;
    }

    return new CustomHttpException(exception.getStatus(), exception.exception, exception.args, lang);
  }
}

@Catch(ThrottlerException)
export class ThrottlerExceptionFilter implements GqlExceptionFilter {
  catch(exception: ThrottlerException, host: ArgumentsHost): CustomHttpException {
    const gqlHost = GqlArgumentsHost.create(host);
    let lang: ExceptionMessage = 'en';
    if (gqlHost.getContext().req) {
      lang = gqlHost.getContext().req.query.lang || lang;
    } else {
      lang = host.switchToHttp().getRequest().query.lang || lang;
    }

    return new CustomHttpException(429, 'RATE_LIMIT_REACHED', [], lang);
  }
}

@Catch(CustomHttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const lang: ExceptionMessage = (request.query.lang as ExceptionMessage) || 'en';

    const translatedException = new CustomHttpException(
      exception.getStatus(),
      exception.exception,
      exception.args,
      lang,
    );

    response.status(status).json(translatedException.getResponse());
  }
}
