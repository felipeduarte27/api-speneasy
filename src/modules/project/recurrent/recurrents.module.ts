import { Module } from '@nestjs/common';
import { recurrentsProvider } from './recurrents.provider';
import { DatabaseModule } from 'src/modules/core/database/database.module';
import { RecurrentController } from './recurrent.controller';
import { RecurrentsService } from './recurrent.service';

@Module({
  imports: [DatabaseModule],
  controllers: [RecurrentController],
  providers: [RecurrentsService, ...recurrentsProvider],
  exports: [],
})
export class RecurrentsModule {}
