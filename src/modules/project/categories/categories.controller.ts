import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDTO } from './dto/create-categories.dto';
import { UpdateCategoriesDTO } from './dto/update-categories.dto';
import { IdParamsDTO } from '../../core/validation/id-params.dto';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('find/:id')
  async findById(@Param() params: IdParamsDTO) {
    const { id } = params;
    return this.categoriesService.findByid(id);
  }

  @Post('create')
  async create(@Body() body: CreateCategoriesDTO) {
    return this.categoriesService.create(body);
  }

  @Put('update/:id')
  async update(
    @Body() body: UpdateCategoriesDTO,
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.categoriesService.update(body, id);
  }

  @Put('delete/:id')
  async delete(
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.categoriesService.delete(id);
  }
}
