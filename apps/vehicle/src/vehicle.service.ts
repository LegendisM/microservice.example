import { Injectable } from '@nestjs/common';

@Injectable()
export class VehicleService {
  getHello(): string {
    return 'Hello World!';
  }
}
