import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices'
import { VehicleModule } from './vehicle.module';
import { RABBIT_SERVICE_OPTIONS } from '@app/rabbit';

async function bootstrap() {
  const app = await NestFactory.create(VehicleModule);

  // * setup
  app.connectMicroservice<MicroserviceOptions>(app.get<MicroserviceOptions>(RABBIT_SERVICE_OPTIONS));

  // * start
  await app.startAllMicroservices();
}
bootstrap();
