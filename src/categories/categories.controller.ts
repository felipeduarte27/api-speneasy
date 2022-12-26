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
import { IdParamsDTO } from '../pipe-validation/id-params.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('findById/:id')
  async findById(@Param() params: IdParamsDTO) {
    const { id } = params;
    return this.categoriesService.findByid(id);
  }

  @Post('createCategories')
  async create(@Body() body: CreateCategoriesDTO) {
    return this.categoriesService.create(body);
  }

  @Put('updateCategories/:id')
  async update(
    @Body() body: UpdateCategoriesDTO,
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.categoriesService.update(body, id);
  }
}
