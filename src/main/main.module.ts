import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { endpointsConfig, redisConfig } from '../config';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [
    ConfigModule.forFeature(endpointsConfig),
    ConfigModule.forFeature(redisConfig),
    LoggerModule,
  ],
  exports: [MainService],
  providers: [MainService],
})
export class MainModule {}
