import { Controller, Get, Render, Req, Res, Session } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response, Request } from 'express';




@Controller()
export class HomeController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('home/index') // hbs dosyasının yolunu verdik. nestjs render
  root(@Req() req: Request) {
    const user = req.user; // passport local ise request.user nesnesi eklemiş olduk artık isteklerde req.user üzerinden kimlik doğrulayan kullanıcı bilgilerine erişebileceğiz.
    // req.session['user'];



    return { title: 'anasayfa', user: user } // model gönderme işlemi view model gönderiken json formatında gönderdik.
  }

  @Get('about') // decorator ile route tanımı yaptık
  about(@Res() res: Response) {
    // express üzerinden sayfalarımızı render etmek için kullanıyorduk
    return res.render('home/about', { title: 'about' })
  }


}
