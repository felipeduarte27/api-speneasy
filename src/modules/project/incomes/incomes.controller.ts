import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Query
} from '@nestjs/common';
import { IdParamsDTO } from '../../core/validation/id-params.dto';
import { UserIdParamsDTO } from '../../core/validation/user-id-params.dto';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';
import { CreateUpdateIncomesDTO } from './dto/create-update-incomes.dto';
import { IncomesService } from './incomes.service';
import { ParseIntPipe } from '@nestjs/common';

@Controller('incomes')
@UseGuards(JwtAuthGuard)
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @Get('find')
  async findById(@Query('userId', ParseIntPipe) userId: number) {
    
    return this.incomesService.findActive(userId);
  }

  @Post('create')
  async create(@Body() body: CreateUpdateIncomesDTO) {
    return this.incomesService.create(body);
  }

  @Put('update/:id')
  async update(
    @Body() body: CreateUpdateIncomesDTO,
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.incomesService.update(body, id);
  }
}
