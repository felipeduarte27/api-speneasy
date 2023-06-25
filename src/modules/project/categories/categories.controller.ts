import {
  Controller,
  Param,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDTO } from './dto/create-categories.dto';
import { UpdateCategoriesDTO } from './dto/update-categories.dto';
import { IdParamsDTO } from '../../core/validation/id-params.dto';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';
import { ParseIntPipe } from '@nestjs/common';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('find/:id')
  async findById(@Param() params: IdParamsDTO) {
    const { id } = params;
    return this.categoriesService.findByid(id);
  }

  @Get('findAllActives')
  async findAllActives(@Query('userId', ParseIntPipe) userId: number) {
 
    return this.categoriesService.findAllActives(userId);
  }

  @Get('findAll')
  async findAll(@Query('userId', ParseIntPipe) userId: number) {

    return this.categoriesService.findAll(userId);
  }

  @Get('findByPeriod/:month/:year')
  async findByPeriod(@Param() params: any, @Query('userId', ParseIntPipe) userId: number) {
    const { month, year } = params;

    return this.categoriesService.findByPeriod(month, year, userId);
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

  @Delete('delete/:id')
  async delete(
    @Param() params: IdParamsDTO,
  ) {
    const { id } = params;
    return this.categoriesService.delete(id);
  }
}
