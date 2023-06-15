import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ValidationErrorException } from './validation-error.exception';

@Catch(ValidationErrorException)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationErrorException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const status = exception.getStatus();
    const constraints = exception.getData()[0].constraints;

    response.status(status).json({
      statusCode: status,
      message: constraints[Object.keys(constraints)[0]],
      error: exception.message,
    });
  }
}
