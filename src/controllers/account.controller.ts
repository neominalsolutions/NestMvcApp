/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { Login } from 'src/models/login.model';
import { LocalAuthGuard } from 'src/passport/local.auth.guard';
import { AuthService } from 'src/services/auth.service';

@Controller()
export class AccountController {

  constructor(private authService: AuthService) { }

  @Get('login')
  getLogin(@Res() res: Response, @Req() req: Request) {
    // form bilgisi
    return res.render('account/login');
  }

  // TS method overloading olmadığında action işlemlerini farklı veriyoruz
  @Post('login')
  // @UseGuards(LocalAuthGuard)
  async postLogin(@Body() model: Login, @Res() res: Response, @Session() session: Record<string, any>, @Req() req: Request) {

    // req.isAuthenticated yapalım
    // Auth Guard yapalım
    if (req.isAuthenticated()) { // user döndüyse
      // user bilgisini session atalım.
      // express-session

      // login olduktan sonra sessionda bilgileri saklarız.
      // session['user'] = { isAuthenticated: true, name: user.name, id: user.userId };

      return res.redirect('/'); // ilgili route değerine yönlendirme
    }

    // doğru bir işlem ise indexe yönlendir.

    return res.render('account/login');
  }

  @Get('logout')
  async logOut(@Session() session: any, @Res() res: Response) {
    session.destroy(function (err) {
      if (!err) {
        return res.redirect('/login'); // session koparmış olduk
      } else {
        return res.redirect('/'); // hata varsa bu durumda anasayfaya yönlen.
      }
    });

  }

}
