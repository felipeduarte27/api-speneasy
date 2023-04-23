import { Controller, UseGuards, Post, Body } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/core/auth/jwt-auth.guard";
import { CreaterExpensesDTO } from "./dto/create-expenses.dto";
import { ExpensesService } from "./expenses.service";

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private expensesService: ExpensesService){}

  @Post('create')
  async create(@Body() body: CreaterExpensesDTO){
    return this.expensesService.create(body);
  }
}