/*
https://docs.nestjs.com/providers#services
*/

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { Post } from 'src/models/post.model';

@Injectable()
export class PostService {

  // HttpService GET,POST,PUT,DELETE,PATCH gibi api isteklerini atmamızı sağlayan bir servis yapısıdır
  // HTTPModule tanımı yapılmadan bu servis ile çalışamıyoruz.
  constructor(private http: HttpService) { // Nestjs servislere Dependecy injection ile bağlanır.

  }

  async getMultiplePromiseAsync() {

    try {
      var r1 = await this.http.axiosRef.get('https://jsonplaceholder.typicode.com/posts');
      var r2 = await this.http.axiosRef.get('https://jsonplaceholder.typicode.com/posts');

      var data = { r1: r1.data, r2: r2.data };
      return Promise.resolve(data);

    } catch (error) {
      return Promise.reject(error);
    }


  }

  getPostMultiplePromise() {
    return new Promise((resolve, reject) => {

      const p1 = new Promise((resolve, reject) => {
        return this.http.axiosRef.get('https://jsonplaceholder.typicode.com/posts');
      })

      const p2 = new Promise((resolve, reject) => {
        return this.http.axiosRef.get('https://jsonplaceholder.typicode.com/posts');
      })

      return p1.then(res => { return p2 })

    })
  }

  getPosts() {
    // Jsonplaceholder.api den veri sağlayacak
    return this.http.axiosRef.get('https://jsonplaceholder.typicode.com/posts');
  }

  // post detay endpoint
  getPostById(id:number){
    return this.http.axiosRef.get<Post>('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  // ilgili makaleye ait yorumları getirir.
  getComments(id:number){
    return this.http.axiosRef.get('https://jsonplaceholder.typicode.com/comments?postId=' + id)
  }

}
