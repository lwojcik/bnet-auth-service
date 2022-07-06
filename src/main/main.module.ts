import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MainService } from './main.service';
import { endpointsConfig } from '../config';

@Module({
  imports: [ConfigModule.forFeature(endpointsConfig)],
  exports: [MainService],
  providers: [MainService],
})
export class MainModule {}
