import { Controller, Get, Render, Res } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Response } from 'express';

@Controller()
export class HomeController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('home/index') // hbs dosyasının yolunu verdik. nestjs render
  root() {
    return { title: 'anasayfa' } // model gönderme işlemi view model gönderiken json formatında gönderdik.
  }

  @Get('about') // decorator ile route tanımı yaptık
  about(@Res() res: Response) {
    // express üzerinden sayfalarımızı render etmek için kullanıyorduk
    return res.render('home/about', { title: 'about' })
  }


}
