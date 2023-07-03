import { NestFactory } from '@nestjs/core';
import { CompanyModule } from './company.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RABBIT_SERVICE_OPTIONS } from '@app/rabbit';

async function bootstrap() {
  const app = await NestFactory.create(CompanyModule);

  // * setup
  app.connectMicroservice<MicroserviceOptions>(app.get<MicroserviceOptions>(RABBIT_SERVICE_OPTIONS));

  // * start
  await app.startAllMicroservices();
}
bootstrap();
