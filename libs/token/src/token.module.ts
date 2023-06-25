import { DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export class TokenModule {
  static register(): DynamicModule {
    return {
      module: TokenModule,
      imports: [
        JwtModule.registerAsync({
          imports: [
            ConfigModule.forRoot({
              envFilePath: './.env'
            })
          ],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: {
              expiresIn: '7d'
            }
          }),
          inject: [ConfigService]
        })
      ],
      exports: [JwtModule]
    }
  }
}
