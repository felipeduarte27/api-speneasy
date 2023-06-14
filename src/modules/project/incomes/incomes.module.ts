import { Module } from '@nestjs/common';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';
import { incomesProvider } from './incomes.provider';
import { DatabaseModule } from 'src/modules/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [IncomesController],
  providers: [IncomesService, ...incomesProvider],
  exports: [],
})
export class IncomesModule {}
