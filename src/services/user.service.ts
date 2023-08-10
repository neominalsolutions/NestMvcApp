/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

  private readonly users = [{
    userId: 1,
    name: 'nihat',
    password: 'admin'
  },
  {
    userId: 2,
    name: 'buse',
    password: 'admin'
  },
  {
    userId: 3,
    name: 'mert',
    password: 'admin'
  }]

  // repositoryden user bilgisini çekip kontrol ettik
  async findOne(username: string, password: string) {
    return this.users.find(x => x.name == username && x.password == password);
  }


}
