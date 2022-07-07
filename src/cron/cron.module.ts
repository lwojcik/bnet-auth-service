import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { LoggerModule } from '../logger/logger.module';
import { AccessTokenModule } from '../accesstoken/accesstoken.module';
import { CronService } from './cron.service';

@Module({
  imports: [LoggerModule, AccessTokenModule, ScheduleModule.forRoot()],
  providers: [CronService],
})
export class CronModule {}
