import { NestFactory } from '@nestjs/core';
import { OtpModule } from './otp.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { RABBIT_SERVICE_OPTIONS } from '@app/rabbit';

async function bootstrap() {
  const app = await NestFactory.create(OtpModule);

  // * setup
  app.connectMicroservice<MicroserviceOptions>(app.get<MicroserviceOptions>(RABBIT_SERVICE_OPTIONS));

  // * run
  await app.startAllMicroservices();
}
bootstrap();
