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

import { buildTree } from './helpers/categories.helper';

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
        include: [{
          model: User,
          attributes: ['id', 'name'],
        },
        {
          model: Recurrents,
          where: {active: true},          
          attributes: ['id'],
          required: false,
        }],
      });

      if (!dataDB) {
        throw new NotFoundException('Dado não encontrado !');
      }

      return dataDB;
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }

  async findAll(): Promise<any>{
   
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [results] = await this.sequelize.query(`
        select distinct (c.id), c.categories_id as pai, c."name", 
        (select r.value from recurrents r where r.categories_id = c.id and r.active is true) as recurrent_value, 
        (select sum(e.value) from expenses e where e.categories_id = c.id and e."month" = ${month} and e."year" = ${year}) as expenses_value
        from categories c
        where c.active is true
        order by c.id
    `);
    
    const treeData = buildTree(results);
    return treeData;
  }

  async findAllActives(userId: number): Promise<any>{
    return this.categoriesRepository.findAll({where: {active: true, userId: userId}});
  }

  async findByPeriod(month: number, year: number): Promise<any>{
    const [results] = await this.sequelize.query(`
        select distinct (c.id), c.categories_id as pai, c."name", 
        (
          select r.value from recurrents r where r.categories_id = c.id and 
          ((initial_year < ${year} OR (initial_year  = ${year} AND initial_month  <= ${month}))
            AND (final_year is null or final_year > ${year} OR (final_year  = ${year} AND final_month  >= ${month}))) limit 1
          ) as recurrent_value, 
        (select sum(e.value) from expenses e where e.categories_id = c.id and e."month" = ${month} and e."year" = ${year}) as expenses_value
        from categories c
        where c.active is true
        order by c.id
    `);
    
    const treeData = buildTree(results);
    return treeData;
  }

  async create(category: CreateCategoriesDTO): Promise<Categories> {
    try {

      const {name, active, userId, categoriesId} = category;
      let categoryDB = null;

      await this.sequelize.transaction(async t => {
        const transactionHost = { transaction: t };
  
        categoryDB = await this.categoriesRepository.create({ name, active, userId, categoriesId }, transactionHost);

        //if(recurrent)
        //  await this.recurrentsRepository.create({...recurrent, categoriesId: categoryDB.id}, transactionHost);
      });
      return categoryDB;

    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }

  async update(category: UpdateCategoriesDTO, id: number): Promise<Categories> {
    try {
      
      const {name, active, userId, categoriesId, recurrent} = category;

      const categoryDB = await this.categoriesRepository.findOne({
        where: { id: id },
      });

      const recurrentDB = await this.recurrentsRepository.findOne({
        where: {categoriesId: categoryDB.id, active: true}
      });

      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      if(!recurrentDB && recurrent){
        await this.recurrentsRepository.create({...recurrent, categoriesId: categoryDB.id});
      }
      else if (recurrentDB && !recurrent){   
        
        await recurrentDB.update({active: false, finalMonth: month, finalYear: year});
      } 
      else if (recurrentDB && recurrent) {  
        if(recurrentDB.value !== recurrent.value){
          await recurrentDB.update({active: false, finalMonth: month, finalYear: year});
          await this.recurrentsRepository.create({...recurrent, categoriesId: categoryDB.id});
        }
      }

      return categoryDB.update({
        name, active, userId, categoriesId
      });
    } catch (errors) {
      console.log(errors)
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
