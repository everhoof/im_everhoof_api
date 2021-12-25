import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { CustomHttpException } from '@common/exceptions/exceptions';
import { ThrottlerException } from "@nestjs/throttler";
export declare class GraphqlExceptionFilter implements GqlExceptionFilter {
    catch(exception: CustomHttpException, host: ArgumentsHost): CustomHttpException;
}
export declare class ThrottlerExceptionFilter implements GqlExceptionFilter {
    catch(exception: ThrottlerException, host: ArgumentsHost): CustomHttpException;
}
export declare class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: CustomHttpException, host: ArgumentsHost): void;
}
