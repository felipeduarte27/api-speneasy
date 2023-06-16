import { Controller, UseGuards, Post, Get, Body, Param } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/core/auth/jwt-auth.guard";
import { CreaterExpensesDTO } from "./dto/create-expenses.dto";
import { ExpensesService } from "./expenses.service";

interface Period {
  month: number,
  year: number
}

@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private expensesService: ExpensesService){}

  @Post('create')
  async create(@Body() body: CreaterExpensesDTO){    
    return this.expensesService.create(body);
  }

  @Get('findTotalExpenseActualMonth')
  async findTotalExpenseActualMonth(){
    return this.expensesService.findTotalExpenseActualMonth();
  }

  @Get('findTotalExpensesByPeriod/:month/:year')
  async findTotalExpensesByPeriod(@Param() params: Period){
    const { month, year } = params;
    return this.expensesService.findTotalExpensesByPeriod(month, year);
  }
}