import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from '../user/users.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
