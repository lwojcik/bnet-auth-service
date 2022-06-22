import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  imports: [LoggerModule],
  controllers: [StatusController],
  providers: [StatusService],
})
export class StatusModule {}
