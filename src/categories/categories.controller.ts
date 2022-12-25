import { Controller, Param, Get, Post, Body } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoriesDTO } from './dto/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('findById/:id')
  async findById(@Param() params) {
    const { id } = params;
    return this.categoriesService.findByid(id);
  }

  @Post('createCategories')
  async create(@Body() body: CreateCategoriesDTO) {
    return this.categoriesService.create(body);
  }
}
