import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException, UnauthorizedException, ForbiddenException, HttpException } from '@nestjs/common';
import { Response } from 'express';

// tüm uygulama geleninde buradan gelen hataları merkezi olarak yakala
// ExceptionFilter nestjs tarafında hataları yakalayıp filtrelemek için hata durumlarında araya girip başka işlemler yapmak için kullanırız.

// PassportJs
@Catch(UnauthorizedException, ForbiddenException)
export class AuthHttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();


    if (request.url == "/login") {
      // eğer hata durumudan login sayfasındaysa
      // login sayfasına hata parametreleri gönder
      response.render('account/login', { errors: { message: ['kullanıcı adı ve parola hatalı'] } })
    } else {
      // eğer farklı bir sayfadan authenticated olmadan geliyorsak bu durumda login olmamız gerekiyor
      // sayfayı logine yönlendir.
      response.redirect('/login')
    }



  }
}