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

  async findAll(userId: number): Promise<any>{
   
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [results] = await this.sequelize.query(`
        select distinct (c.id), c.categories_id as pai, c."name", 
        (
          select sum(r.value) 
          from recurrents r 
          where 
          r.categories_id = c.id 
          and r.active is true
          and
          ((initial_year < ${year} OR (initial_year  = ${year} AND initial_month  <= ${month}))
            AND (final_year is null or final_year > ${year} OR (final_year  = ${year} AND final_month  >= ${month})))
        ) as recurrent_value, 
        (
          select sum(e.value) 
          from expenses e 
          where 
          e.categories_id = c.id 
          and e."month" = ${month} 
          and e."year" = ${year}
        ) as expenses_value
        from categories c
        where c.active is true 
        and user_id = ${userId}
        order by c.id
    `);
    
    const treeData = buildTree(results);
    return treeData;
  }

  async findAllActives(userId: number): Promise<any>{
    return this.categoriesRepository.findAll({
      where: {active: true, userId: userId},
      order: ['name']
    });
  }

  async findByPeriod(month: number, year: number, userId: number): Promise<any>{
    const [results] = await this.sequelize.query(`
        select distinct (c.id), c.categories_id as pai, c."name", 
        (
          select r.value from recurrents r where r.user_id = ${userId} and r.categories_id = c.id and 
          ((initial_year < ${year} OR (initial_year  = ${year} AND initial_month  <= ${month}))
            AND (final_year is null or final_year > ${year} OR (final_year  = ${year} AND final_month  >= ${month}))) limit 1
          ) as recurrent_value, 
        (select sum(e.value) from expenses e where e.user_id = ${userId} and e.categories_id = c.id and e."month" = ${month} and e."year" = ${year}) as expenses_value
        from categories c 
        where 
        c.id in ( 
          select categories_id from recurrents r2 where r2.user_id = ${userId} and
            (r2.initial_year < ${year} OR (r2.initial_year  = ${year} AND r2.initial_month  <= ${month}))
              AND (r2.final_year is null or r2.final_year > ${year} OR (r2.final_year  = ${year} AND r2.final_month  >= ${month}))
        ) 
        or 
        c.id in ( 
          select c3.categories_id from categories c3 inner join recurrents r3 on r3.categories_id = c3.id where c3.user_id = ${userId} and
            (r3.initial_year < ${year} OR (r3.initial_year  = ${year} AND r3.initial_month  <= ${month}))
              AND (r3.final_year is null or r3.final_year > ${year} OR (r3.final_year  = ${year} AND r3.final_month  >= ${month}))
        ) 
        or
        c.id in ( select categories_id from expenses e2 where e2.user_id = ${userId} and e2."month" = ${month} and e2."year" = ${year} ) 
        or
        c.id in ( 
          select c2.categories_id 
          from categories c2 
          inner join expenses e3 on c2.id = e3.categories_id 
          where c2.user_id = ${userId} and e3."month" = ${month} and e3."year" = ${year} )   
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
