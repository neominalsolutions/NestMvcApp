/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// net core deki Authorize attribute gibi çalışarak ilgili sayfaya passport local olarak doğru bağlanıp bağlanmadığımızı kontrol eder. 
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ) {

    // nestjs tarafındaki uygulamanın istek atıldığında yapılan istek ile ilgili request,response gibi yapılara erişmemizi sağlayan net core tarafında HttpContext yapısı

    const result = (await super.canActivate(context)) as boolean;

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    await super.logIn(request);


    return result;
  }
}
