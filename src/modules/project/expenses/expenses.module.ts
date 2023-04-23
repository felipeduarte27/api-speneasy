import { Module } from "@nestjs/common";
import { ExpensesController } from "./expenses.controller";
import { ExpensesService } from "./expenses.service";
import { expensesProvider } from "./expenses.provider";
import { DatabaseModule } from "src/modules/core/database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [ExpensesController],
  providers: [ExpensesService, ...expensesProvider],
})
export class ExpensesModule {}