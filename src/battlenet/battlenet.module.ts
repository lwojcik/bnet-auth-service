import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { battleNetConfig } from '../config';
import { BattleNetService } from './battlenet.service';

@Module({
  imports: [ConfigModule.forFeature(battleNetConfig)],
  providers: [BattleNetService],
  exports: [BattleNetService],
})
export class BattleNetModule {}
