import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs'; // view engine üzerindeki ayarları hbs üzerinden hallediceğiz.
// * ile hbs paketindeki tüm bileşenleri çekiyoruz.

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

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

  await app.listen(3000);
}
bootstrap();
