import _ from 'lodash';
import { Module, OnModuleInit } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './service/storage.service';
import { RabbitModule, RabbitServiceName } from '@app/rabbit';
import { InjectS3, S3, S3Module } from 'nestjs-s3';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Database, DatabaseModule } from '@app/database';
import { StorageFileEntity } from './entity/storage-file.entity';
import { StorageFileS3DriverService } from './service/driver/storage-file-s3-driver.service';
import { StorageFileBucket } from './interface/storage-file.interface';

@Module({
  imports: [
    S3Module.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          envFilePath: './.env'
        })
      ],
      useFactory: (configService: ConfigService) => ({
        config: {
          credentials: {
            accessKeyId: configService.get('AWS_S3_ACCESS_KEY'),
            secretAccessKey: configService.get('AWS_S3_SECRET_KEY')
          },
          endpoint: configService.get('AWS_S3_ENDPOINT'),
          forcePathStyle: true,
        }
      }),
      inject: [ConfigService]
    }),
    DatabaseModule.register(Database.PRIMARY),
    DatabaseModule.forEntity(Database.PRIMARY, [StorageFileEntity]),
    RabbitModule.forServerProxy(RabbitServiceName.STORAGE)
  ],
  controllers: [StorageController],
  providers: [StorageService, StorageFileS3DriverService],
})
export class StorageModule implements OnModuleInit {
  constructor(
    @InjectS3() private s3Service: S3
  ) { }

  async onModuleInit() {
    const { Buckets } = await this.s3Service.listBuckets({});
    const buckets = _.map(Buckets, (bucket) => bucket.Name);
    for (const bucketName of Object.values(StorageFileBucket)) {
      if (!buckets.includes(bucketName)) {
        await this.s3Service.createBucket({ Bucket: bucketName });
      }
    }
  }
}
