import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categoriesProvider } from './categories.provider';
import { recurrentsProvider } from '../recurrent/recurrents.provider';
import { DatabaseModule } from 'src/modules/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoriesProvider, ...recurrentsProvider],
  exports: [],
})
export class CategoriesModule {}
