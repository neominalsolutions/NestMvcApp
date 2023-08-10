import { HttpException, HttpStatus } from "@nestjs/common";

export class LocalUnauthorizedException extends HttpException {
  constructor(public url: string) {
    super('Authorized', HttpStatus.UNAUTHORIZED);
  }
}