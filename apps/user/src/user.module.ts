import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { UserEntity } from './entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Database, DatabaseModule } from '@app/database';
import { LanguageModule } from '@app/language';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './.env'
    }),
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [UserEntity]),
    RabbitModule.forServerProxy(RabbitServiceName.USER),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }