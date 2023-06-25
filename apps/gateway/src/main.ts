import * as path from "path";
import * as helmet from "helmet";
import * as compression from "compression";
import { NestFactory, Reflector } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { HttpExceptionFilter } from "@app/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(GatewayModule);

  // * config
  const configService = app.get(ConfigService);

  // * settings
  app.enableCors();
  app.setGlobalPrefix('/api');
  app.enableVersioning({ type: VersioningType.URI });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpExceptionFilter());

  // * middlewares
  app.use(compression());
  app.use(helmet.default());

  // * assets
  app.useStaticAssets(path.join(__dirname, '..', 'public'), { index: false, prefix: '/public' });

  // * swagger
  const documentConfig = new DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('Swagger API Documention')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('/document', app, document, { jsonDocumentUrl: '/document.json' });

  await app.listen(configService.get<number>('GATEWAY_PORT'));
}
bootstrap();
