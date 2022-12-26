import { Injectable, Inject } from '@nestjs/common';
import { Categories } from './categories.entity';
import { User } from 'src/user/user.entity';
import { CreateCategoriesDTO } from './dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: typeof Categories,
  ) {}

  async findByid(id: number): Promise<Categories> {
    const dataDB = await this.categoriesRepository.findOne({
      attributes: ['id', 'name'],
      where: { id: id },
      include: {
        model: User,
        attributes: ['id', 'name', 'email'],
      },
    });
    return dataDB;
  }

  async create(categories: CreateCategoriesDTO): Promise<Categories> {
    const dataDB = await this.categoriesRepository.create({ ...categories });
    return dataDB;
  }
}
