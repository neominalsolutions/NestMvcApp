/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {

  constructor(private userService: UserService) { }

  // kullanıcı sistemde var mı yok mu
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username, password);

    if (user) {
      const { password, ...result } = user;
      // objenin içerisindeki parola değerini kaldırdım
      // let r = { username:user.name, userId:user.userId};
      // return r;
      // user bilgisini login olan kullanıcı olarak kullanacağız.
      return result;
    }
  }
}
