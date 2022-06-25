import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '../config';
import { LoggerModule } from '../logger/logger.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [LoggerModule, ConfigModule.forFeature(authConfig)],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
