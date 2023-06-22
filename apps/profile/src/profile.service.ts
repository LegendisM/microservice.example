import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
  getHello(): string {
    return 'Hello World!';
  }
}
