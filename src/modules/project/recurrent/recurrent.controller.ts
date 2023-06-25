import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Query,
  Put
} from '@nestjs/common';
import { IdParamsDTO } from '../../core/validation/id-params.dto';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';
import { CreateRecurrentDTO } from './dto/create-recurrent.dto';
import { RecurrentsService } from './recurrent.service';
import { ParseIntPipe } from '@nestjs/common';

interface Period {
  month: number,
  year: number
}

@Controller('recurrents')
@UseGuards(JwtAuthGuard)
export class RecurrentController {
  constructor(private recurrentsService: RecurrentsService) {}

  @Post('create')
  async create(@Body() body: CreateRecurrentDTO) {
    return this.recurrentsService.create(body);
  }

  @Get('findAllActives')
  async findAllActives(@Query('userId', ParseIntPipe) userId: number) {
  
    return this.recurrentsService.findAllActives(userId);
  }

  @Delete('delete/:id')
  async delete(
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.recurrentsService.delete(id);
  }

  @Put('update/:id')
  async update(
    @Param() params: IdParamsDTO,
    @Body() body: any
  ) {
    const { id } = params;
    
    return this.recurrentsService.update(body, id);
  }

  @Get('findTotalRecurrentsActualMonth')
  async findTotalExpenseActualMonth(@Query('userId', ParseIntPipe) userId: number){
    return this.recurrentsService.findTotalRecurrentsActualMonth(userId);
  }

  @Get('findTotalRecurrentsByPeriod/:month/:year')
  async findTotalExpensesByPeriod(@Param() params: Period, @Query('userId', ParseIntPipe) userId: number){
    const { month, year } = params;
    return this.recurrentsService.findTotalRecurrentsByPeriod(month, year, userId);
  }
}
