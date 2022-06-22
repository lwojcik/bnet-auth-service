import { Module } from '@nestjs/common';
import { RequestContextModule } from 'nestjs-request-context';
import { CacheModule } from '../cache/cache.module';
import { BattleNetModule } from '../battlenet/battlenet.module';
import { AccessTokenController } from './accesstoken.controller';
import { AccessTokenService } from './accesstoken.service';

@Module({
  imports: [BattleNetModule, RequestContextModule, CacheModule],
  controllers: [AccessTokenController],
  providers: [AccessTokenService],
})
export class AccessTokenModule {}
