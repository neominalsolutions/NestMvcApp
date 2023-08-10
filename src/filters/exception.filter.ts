import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalUnauthorizedException } from 'src/exceptions/local.auth.exception';


// tüm uygulama geleninde buradan gelen hataları merkezi olarak yakala
// ExceptionFilter nestjs tarafında hataları yakalayıp filtrelemek için hata durumlarında araya girip başka işlemler yapmak için kullanırız.

@Catch(LocalUnauthorizedException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: LocalUnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // exception sonrasında bir yönlendirme yap
    response.redirect(exception.url);
  }
}