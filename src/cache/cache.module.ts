import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisConfig } from '../config';
import { REDIS } from '../common/constants';
import { CacheService } from './cache.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    ConfigModule.forFeature(redisConfig),
    LoggerModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: {
          host: configService.get(REDIS.host),
          password: configService.get(REDIS.password),
          port: configService.get(REDIS.port),
          db: configService.get(REDIS.db),
          keyPrefix: configService.get(REDIS.keyPrefix),
        },
      }),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
