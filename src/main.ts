import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs'; // view engine üzerindeki ayarları hbs üzerinden hallediceğiz.
// * ile hbs paketindeki tüm bileşenleri çekiyoruz.
import * as session from 'express-session';
import * as passport from 'passport';
import { ValidationExceptionFilter } from './filters/validation.filter';
import { ValidationPipe } from '@nestjs/common';
import { ValidationInterceptor } from './interceptors/validation.interceptor';
import { AuthHttpExceptionFilter } from './filters/auth.exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // web uygulamalarında hassas bilgilerin sunucu taraflı saklamasını sağlayan bir veri depolama yöntemi
  app.use(session({
    name: 'my-cookie',
    secret: 'isnet',
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   httpOnly: true,
    //   maxAge: 1000 * 20 * 60,
    // }
  }));
  app.use(passport.initialize()); // passport aktif et
  app.use(passport.session()); // session bilgilerini passport üzerinden kullan.




  // assetler uygulamadaki static olarak dosyaların barındırıldığı yer
  // public klasör ayarlaması yapıyoruz
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // // src altında viewslermin bulunduğu klasör dizini belirttik.
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, 'views'));

  // uygulamadaki sayfaların layoutlarının bulunduğu dizin

  app.set('view options', {
    layout: '/layouts/main'
  });

  // backticks
  // string interpolation yapısı
  // $"{id} deneme" 1 deneme
  // Alt+Gr + ;
  // uygulamadaki partialları render etmeyi aktif hale getirdik.
  hbs.registerPartials(`${__dirname}/views/partials`);
  // render script işlemleri section adında bir helper template yardımcı kullanıcam
  // script
  // style
  hbs.registerHelper('section', function (name, options) {
    if (!this.sections) this.sections = {};
    this.sections[name] = options.fn(this);
    return null;
  });


  // view engine olarak handlebars kullanıcağız
  app.setViewEngine('hbs');

  // npm install --save hbs

  // uygulama global olarak bu httpExceptionların filtrelenmesi özelliğni göstersin.
  app.useGlobalFilters(new ValidationExceptionFilter());
  app.useGlobalFilters(new AuthHttpExceptionFilter());
  // uygulama genelinde bir validayon hatası varsa bunu yakalar.
  // pipes yapıları veri transform veriyi manüple etme işlemleri için nestjs tarafında kullanılan bir servis
  app.useGlobalPipes(new ValidationPipe());

  // request response araya girme işlemi
  app.useGlobalInterceptors(new ValidationInterceptor());
  await app.listen(3000);
}
bootstrap();
