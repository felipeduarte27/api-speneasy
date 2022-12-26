import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Categories } from './categories.entity';
import { User } from 'src/user/user.entity';
import { CreateCategoriesDTO } from './dto/create-categories.dto';
import { UpdateCategoriesDTO } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: typeof Categories,
  ) {}

  async findByid(id: number): Promise<Categories> {
    try {
      const dataDB = await this.categoriesRepository.findOne({
        attributes: ['id', 'name'],
        where: { id: id },
        include: {
          model: User,
          attributes: ['id', 'name', 'email'],
        },
      });

      if (!dataDB) {
        throw new NotFoundException('Dado não encontrado !');
      }

      return dataDB;
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }

  async create(categories: CreateCategoriesDTO): Promise<Categories> {
    try {
      return this.categoriesRepository.create({ ...categories });
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }

  async update(category: UpdateCategoriesDTO, id: number): Promise<Categories> {
    try {
      const categoryDB = await this.categoriesRepository.findOne({
        where: { id: id },
      });
      return categoryDB.update({
        ...category,
      });
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }
}
