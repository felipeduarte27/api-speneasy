import {
  Injectable,
  Inject,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Categories } from './categories.entity';
import { User } from 'src/modules/project/user/user.entity';
import { Recurrents } from '../recurrent/recurrents.entity';
import { Sequelize } from 'sequelize-typescript';
import { CreateCategoriesDTO } from './dto/create-categories.dto';
import { UpdateCategoriesDTO } from './dto/update-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject('CATEGORIES_REPOSITORY')
    private categoriesRepository: typeof Categories,
    @Inject('RECURRENTS_REPOSITORY')
    private recurrentsRepository: typeof Recurrents,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize
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

  async create(category: CreateCategoriesDTO): Promise<Categories> {
    try {

      const {name, active, userId, categoriesId, recurrent} = category;
      let categoryDB = null;

      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
  
        categoryDB = await this.categoriesRepository.create({ name, active, userId, categoriesId }, transactionHost);

        if(recurrent)
          await this.recurrentsRepository.create({...recurrent, categoriesId: categoryDB.id}, transactionHost);
      });
      return categoryDB;

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

  async delete(id: number): Promise<Categories> {
    try {
      const categoryDB = await this.categoriesRepository.findOne({
        where: { id: id },
      });
      return categoryDB.update({
        active: false,
        fields: ['active']
      });
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }
}
