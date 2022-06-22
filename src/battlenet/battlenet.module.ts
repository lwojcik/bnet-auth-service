import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from '../logger/logger.module';
import { battleNetConfig } from '../config';
import { BattleNetService } from './battlenet.service';

@Module({
  imports: [ConfigModule.forFeature(battleNetConfig), LoggerModule],
  providers: [BattleNetService],
  exports: [BattleNetService],
})
export class BattleNetModule {}
