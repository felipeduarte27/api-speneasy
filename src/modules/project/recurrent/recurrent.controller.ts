import {
  Controller,
  Param,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { IdParamsDTO } from '../../core/validation/id-params.dto';
import { UserIdParamsDTO } from '../../core/validation/user-id-params.dto';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';
import { CreateRecurrentDTO } from './dto/create-recurrent.dto';
import { RecurrentsService } from './recurrent.service';

@Controller('recurrents')
@UseGuards(JwtAuthGuard)
export class RecurrentController {
  constructor(private recurrentsService: RecurrentsService) {}

  @Post('create')
  async create(@Body() body: CreateRecurrentDTO) {
    return this.recurrentsService.create(body);
  }

  @Get('findAllActives/:userId')
  async findAllActives(@Param() params: any,) {
    const { userId } = params;
    return this.recurrentsService.findAllActives(userId);
  }

  @Delete('delete/:id')
  async delete(
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.recurrentsService.delete(id);
  }
}
