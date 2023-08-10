/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, InternalServerErrorException, Param, Render, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { PostService } from 'src/services/post.service';

@Controller('makale')
@UseGuards(AuthGuard) // Authorize attribue koyduk, isAuthenticated olan kullanılar girebilsin 
export class PostController {

  // post servis instance alındı
  // nestjs default olarak servis instance singleton yapıyor
  constructor(private postService: PostService) { }

  // makale
  @Get()
  // @Render('post/index') // static model göndermeden önceki değerlerde sıkınıtı yaratmıyor.
  posts(@Res() res: Response) {
    this.postService.getPosts().then(response => {
      console.log('response', response.data);
      return res.render('post/index', { title: 'makaleler', model: response.data });
    }).catch(err => {
      throw new InternalServerErrorException();
    });
  }

  // makale/1
  @Get(':id') // dinamik route tanımı
  // @Render('post/detail') // makale detay linl
  async postDetail(@Param('id') id: number, @Res() res: Response) {

    // burada async await ile veri çekme işlemi yapalım.
    try {
      var response = (await this.postService.getPostById(id)).data;
      return res.render('post/detail', { title: 'makale detay', model: response })
    } catch (error) {
      throw new InternalServerErrorException();
    }

  }

  @Get(':id/yorumlar') // makale/1/yorumlar
  async postComments(@Param('id') id: number, @Res() res: Response) {
    console.log('makale yorumlar');
    var response = (await this.postService.getComments(id)).data;
    // ilgili partial view veri gönder.
    // layout:false ile partial view render ederken layout yansıtma demek oluyor.
    return res.render('partials/post-comments', { model: response, layout: false });
  }

}
