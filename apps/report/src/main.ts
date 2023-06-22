import { NestFactory } from '@nestjs/core';
import { ReportModule } from './report.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RABBIT_SERVICE_OPTIONS } from '@app/rabbit';

async function bootstrap() {
  const app = await NestFactory.create(ReportModule);

  // * setup
  app.connectMicroservice<MicroserviceOptions>(app.get<MicroserviceOptions>(RABBIT_SERVICE_OPTIONS));

  // * start
  app.startAllMicroservices();
}
bootstrap();
