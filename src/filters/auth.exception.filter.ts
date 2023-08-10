import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, UnauthorizedException, ForbiddenException, HttpException } from '@nestjs/common';
import { Response } from 'express';

// tüm uygulama geleninde buradan gelen hataları merkezi olarak yakala
// ExceptionFilter nestjs tarafında hataları yakalayıp filtrelemek için hata durumlarında araya girip başka işlemler yapmak için kullanırız.

@Catch(UnauthorizedException,ForbiddenException)
export class AuthHttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    
    if(request.url == "/login") {
      response.render('account/login', {errors:{message:['kullanıcı adı ve parola hatalı']}})
    } else {
      response.redirect('/login')
    }

   

  }
}