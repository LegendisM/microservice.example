import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
  getHello(): string {
    return 'Hello World!';
  }
}
