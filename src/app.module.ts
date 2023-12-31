import { AccountController } from './controllers/account.controller';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { Module } from '@nestjs/common';
import { HomeController } from './controllers/home.controller';
import { AppService } from './services/app.service';
import { HttpModule } from '@nestjs/axios';
import { LocalStrategy } from './passport/local.strategy';
import { SessionSerializer } from './passport/session.serializer';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000, // default bir web uygulaması apidan veri çekiyorsa api tarafından cevap geç dönebilir. Bu sebeple buradaki maksimum isteğin ne kadarlık bir süre bekleneceğini yazdık. default 5000 ms yani 5 sn
        maxRedirects: 5 // 10 sn içerisinde bu endpointe 5 kez istek retry edilebilir.

      })
    })
  ], // 3rd module veya uygulama içerisinde nestjs tarafında kullanılan module paketleri uygulamaya buradan import.
  // yani başka bir paket olarak yazılmış olan dosyaları uygulamamıza tanıtmak import olarak ekliyoruz.
  controllers: [
        AccountController, 
    PostController, HomeController],
  providers: [
        UserService, 
    AuthService,
    PostService, AppService, LocalStrategy, SessionSerializer],
})
export class AppModule { }
