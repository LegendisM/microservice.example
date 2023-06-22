import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';

@Module({
  imports: [
    RabbitModule.forServerProxy(RabbitServiceName.REPORT),
    RabbitModule.forClientProxy(RabbitServiceName.USER),
    RabbitModule.forClientProxy(RabbitServiceName.VEHICLE),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule { }
