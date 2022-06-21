import { Module } from '@nestjs/common';
import { BattleNetModule } from '../battlenet/battlenet.module';
import { AccessTokenController } from './accesstoken.controller';
import { AccessTokenService } from './accesstoken.service';

@Module({
  imports: [BattleNetModule],
  controllers: [AccessTokenController],
  providers: [AccessTokenService],
})
export class AccessTokenModule {}
