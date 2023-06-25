import { Controller, UseGuards, Post, Get, Body, Param, Delete, Query } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/core/auth/jwt-auth.guard";
import { CreaterExpensesDTO } from "./dto/create-expenses.dto";
import { ExpensesService } from "./expenses.service";
import { IdParamsDTO } from "src/modules/core/validation/id-params.dto";
import { ParseIntPipe } from '@nestjs/common';

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
  async findTotalExpenseActualMonth(@Query('userId', ParseIntPipe) userId: number){
    return this.expensesService.findTotalExpenseActualMonth(userId);
  }

  @Get('findTotalExpensesByPeriod/:month/:year')
  async findTotalExpensesByPeriod(@Param() params: Period, @Query('userId', ParseIntPipe) userId: number){
    const { month, year } = params;
    return this.expensesService.findTotalExpensesByPeriod(month, year, userId);
  }

  @Get('findByPeriod/:month/:year')
  async findByPeriod(@Param() params: Period, @Query('userId', ParseIntPipe) userId: number){
    const { month, year } = params;
    return this.expensesService.findByPeriod(month, year, userId);
  }

  @Delete('delete/:id')
  async delete(@Param() params: IdParamsDTO){
    const { id } = params;
    return this.expensesService.delete(id);
  }
}