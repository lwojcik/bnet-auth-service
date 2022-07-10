import { Module } from '@nestjs/common';
import { MainService } from './main.service';

@Module({
  exports: [MainService],
  providers: [MainService],
})
export class MainModule {}
