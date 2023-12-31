/*
https://docs.nestjs.com/interceptors#interceptors
*/

import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Response, request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// request response pipeline ara girip response ilgili yada request ile ilgili ara işlemleri yapmamızı sağlayan bir aspect oriented programlama tekniği.
// Guards, ValidationPipes, Interceptors, ExceptionFilters 

@Injectable()
export class ValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    var controllerName =  context.getClass().name;

    var response = context.switchToHttp().getResponse<Response>();

    const request = context.switchToHttp().getRequest<Request>();

    const viewFolderName = controllerName.replace('Controller','').toLowerCase();

    response.locals['viewName'] = `${viewFolderName}${request.url}`;
    

    return next
      .handle()
      .pipe(
        tap(() => console.log(`After...`)),
      );
  }
}
