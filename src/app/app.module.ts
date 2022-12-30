import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from '../modules/project/user/users.module';
import { CategoriesModule } from '../modules/project/categories/categories.module';

@Module({
  imports: [UsersModule, CategoriesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
