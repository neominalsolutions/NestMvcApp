/*
https://docs.nestjs.com/guards#guards
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { LocalUnauthorizedException } from 'src/exceptions/local.auth.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const req = context.switchToHttp().getRequest<Request>();

    if (req.isAuthenticated()) {
      return true;
    } // false dönderse ilgili sayfaya giremeyecek // eğer true gelirse ilgili sayfaya girebilecek.
    else {
      // eğer oturum açık değilse beni login sayfasına yönlendir.
      throw new LocalUnauthorizedException('/login')
    }
  }
}
