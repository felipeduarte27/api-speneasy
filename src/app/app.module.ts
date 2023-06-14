import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from '../modules/project/user/users.module';
import { CategoriesModule } from '../modules/project/categories/categories.module';
import { ExpensesModule } from 'src/modules/project/expenses/expenses.module';
import { IncomesModule } from 'src/modules/project/incomes/incomes.module';

@Module({
  imports: [UsersModule, CategoriesModule, ExpensesModule, IncomesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
