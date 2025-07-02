import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { DomainError, NotFoundError, NotNullError, EmailError, SizeError } from '../../domain/errors';

const errorStatusMap = new Map([
  [NotFoundError, HttpStatus.NOT_FOUND],
  [NotNullError, HttpStatus.BAD_REQUEST],
  [EmailError, HttpStatus.BAD_REQUEST],
  [SizeError, HttpStatus.BAD_REQUEST],
]);

@Catch(DomainError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = Array.from(errorStatusMap.entries())
      .find(([ErrorClass]) => exception instanceof ErrorClass)?.[1] ?? HttpStatus.UNPROCESSABLE_ENTITY;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      code: exception.code,
    });
  }
}
