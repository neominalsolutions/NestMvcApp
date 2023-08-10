/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AuthGuard, IAuthModuleOptions } from '@nestjs/passport';
import { Request } from 'express';
import { LocalUnauthorizedException } from 'src/exceptions/local.auth.exception';

// net core deki Authorize attribute gibi çalışarak ilgili sayfaya passport local olarak doğru bağlanıp bağlanmadığımızı kontrol eder. 
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {

  async canActivate(
    context: ExecutionContext,
  ) {

    // nestjs tarafındaki uygulamanın istek atıldığında yapılan istek ile ilgili request,response gibi yapılara erişmemizi sağlayan net core tarafında HttpContext yapısı

    const request = context.switchToHttp().getRequest<Request>();

    if (request.body.username == '' || request.body.password) {
      throw new BadRequestException({ status: 400, message: ['username boş geçilemez', 'parola boş geçilemez'] });
    }
    else {
      const result = (await super.canActivate(context)) as boolean;

      const response = context.switchToHttp().getResponse();

      await super.logIn(request);


      return result;
    }



  }
}
