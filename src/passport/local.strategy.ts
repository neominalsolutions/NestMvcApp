// form üzerinden login olduğumuz için localStrategy kullanıyoruz.

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "src/services/auth.service";
import { LocalUnauthorizedException } from "src/exceptions/local.auth.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super();
  }

  // login olacak user valide edip etmediğimizi kontrol ettiğimiz passwordStrategy servisi
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      // api için doğru kod
      throw new LocalUnauthorizedException('/login');

      // return null; // login post method isAuthenticated false olup hata mesajlarını ekrana verebilmek için yaptık
    }
    return user;
  }
}