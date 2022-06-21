import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REDIS } from '../common/common.constants';
import { BattleNetModule } from '../battlenet/battlenet.module';
import { AccessTokenController } from './accesstoken.controller';
import { AccessTokenService } from './accesstoken.service';

@Module({
  imports: [
    BattleNetModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: {
          host: configService.get(REDIS.host),
          port: configService.get(REDIS.port),
          db: configService.get(REDIS.db),
          keyPrefix: configService.get(REDIS.cacheSegment),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AccessTokenController],
  providers: [AccessTokenService],
})
export class AccessTokenModule {}
