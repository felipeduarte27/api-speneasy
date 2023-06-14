import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { IdParamsDTO } from '../../core/validation/id-params.dto';
import { UserIdParamsDTO } from '../../core/validation/user-id-params.dto';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';
import { CreateUpdateIncomesDTO } from './dto/create-update-incomes.dto';
import { IncomesService } from './incomes.service';

@Controller('incomes')
@UseGuards(JwtAuthGuard)
export class IncomesController {
  constructor(private incomesService: IncomesService) {}

  @Get('find/:userId')
  async findById(@Param() params: UserIdParamsDTO) {
    const { userId } = params;
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
