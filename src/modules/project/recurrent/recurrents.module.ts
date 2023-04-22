import { Module } from '@nestjs/common';
import { recurrentsProvider } from './recurrents.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [...recurrentsProvider],
  exports: [],
})
export class RecurrentsModule {}
