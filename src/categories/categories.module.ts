import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categoriesProvider } from './categories.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesService, ...categoriesProvider],
  controllers: [CategoriesController],
  exports: [],
})
export class CategoriesModule {}
