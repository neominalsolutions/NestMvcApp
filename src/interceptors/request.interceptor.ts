/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const request = context.switchToHttp().getRequest<Request>();
   const response = context.switchToHttp().getResponse<Response>();

    // AccountController controller name
    const controllerName = context.getClass().name; // controller sınıfına erişim sağlarız
    const actionName = context.getHandler().name; // istek atılan actiona erişim.

    // request.url // /login

    // account
    const viewName = controllerName.replace("Controller","").toLowerCase() + request.url;
    // account/login

    // response içerisinde viewName denilen bir değişken oluşturdum. daha sonra hata durumunda response içinsinden son istek atılan viewName yakalıp hata değerini viewName göndericem.
    response.locals['viewName'] = viewName;


    console.log('Before...');
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After...`)),
      );
  }
}
