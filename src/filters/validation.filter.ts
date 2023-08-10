import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Response } from 'express';

// tüm uygulama geleninde buradan gelen hataları merkezi olarak yakala
// ExceptionFilter nestjs tarafında hataları yakalayıp filtrelemek için hata durumlarında araya girip başka işlemler yapmak için kullanırız.

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {

  catch(exception: BadRequestException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = exception.getResponse();

    response.render(response.locals['viewName'], {errors:errors})

  }
}