import { Controller, Get } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getHello(): string {
    return this.reportService.getHello();
  }
}
