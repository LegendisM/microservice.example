import { DynamicModule } from "@nestjs/common";
import { RabbitServiceName } from "./interface/rabbit.interface";
import { ClientsModule, MicroserviceOptions, Transport } from "@nestjs/microservices";
import { RABBIT_SERVICE_OPTIONS, RABBIT_SERVICES } from "./constant/rabbit.constant";
import { ConfigModule, ConfigService } from "@nestjs/config";

export class RabbitModule {
  static forServerProxy(service: RabbitServiceName): DynamicModule {
    return {
      module: RabbitModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: './.env'
        })
      ],
      providers: [
        {
          provide: RABBIT_SERVICE_OPTIONS,
          useFactory: (configService: ConfigService): MicroserviceOptions => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBIT_MQ_URI')],
                queue: RABBIT_SERVICES[service].queue
              }
            }
          },
          inject: [ConfigService]
        }
      ],
      exports: [RABBIT_SERVICE_OPTIONS]
    }
  }

  static forClientProxy(service: RabbitServiceName): DynamicModule {
    return {
      module: RabbitModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: './.env'
        }),
        ClientsModule.registerAsync({
          clients: [
            {
              name: service,
              useFactory: (configService: ConfigService) => ({
                transport: Transport.RMQ,
                options: {
                  urls: [configService.get<string>('RABBIT_MQ_URI')],
                  queue: RABBIT_SERVICES[service].queue
                }
              }),
              inject: [ConfigService]
            }
          ]
        })
      ],
      exports: [ClientsModule]
    }
  }
}
