import { Module } from '@nestjs/common';
import { AccessTokenController } from './accesstoken.controller';
import { AccessTokenService } from './accesstoken.service';

@Module({
  controllers: [AccessTokenController],
  providers: [AccessTokenService],
})
export class AccessTokenModule {}
