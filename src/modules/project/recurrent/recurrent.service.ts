import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Recurrents } from "./recurrents.entity";
import { CreateRecurrentDTO } from "./dto/create-recurrent.dto";
import { Categories } from "../categories/categories.entity";
import { Sequelize } from 'sequelize-typescript';

type Object = {
  [key: string]: any; 
};

@Injectable()
export class RecurrentsService {
  constructor(
    @Inject('RECURRENTS_REPOSITORY')
    private recurrentsRepository: typeof Recurrents,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize   
  ){}

  async create(recurrent: CreateRecurrentDTO): Promise<Recurrents>{
    try{
      
    const { active, value, initialMonth, initialYear, finalMonth, finalYear, userId, categoriesId } = recurrent;
    return this.recurrentsRepository.create({ active, value, initialMonth, initialYear, finalMonth, finalYear, userId, categoriesId });

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }

  async findAllActives(userId: number): Promise<any>{
    try{
      
    return this.recurrentsRepository.findAll({
      where: { active: true, userId: userId },
      include: [
        {
          model: Categories,
          attributes: ['id', 'name'],
        },
      ]
    })

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }

  async delete(id: number): Promise<Recurrents>{
    try{
      
    const returnDB = await this.recurrentsRepository.findOne({ where: { id: id } });

    return returnDB.update({
      active: false,
      fields: ['active']
    })

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }

  async findTotalRecurrentsActualMonth(userId: number): Promise<number>{
    try{

      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const [results] = await this.sequelize.query(`
        select sum(value) from recurrents r 
        where r."user_id" = ${userId} and r."active" is true and 
        (initial_year < ${year} OR (initial_year  = ${year} AND initial_month  <= ${month}))
            AND (final_year is null or final_year > ${year} OR (final_year  = ${year} AND final_month  >= ${month}))
      `);
      const obj: Object = results[0];
      
      if(obj.sum > 0){
        return obj.sum;
      }else{
        return 0;
      }

    }catch(errors){
      console.log(errors)
      throw new InternalServerErrorException(errors.message);
    }
  };

  async findTotalRecurrentsByPeriod(month: number, year: number, userId: number): Promise<number>{
    try{
      
      const [results] = await this.sequelize.query(`
        select sum(value) from recurrents r 
        where r."user_id" = ${userId} and r."active" is true and 
        (initial_year < ${year} OR (initial_year  = ${year} AND initial_month  <= ${month}))
            AND (final_year is null or final_year > ${year} OR (final_year  = ${year} AND final_month  >= ${month}))
      `);
      const obj: Object = results[0];
      
      if(obj.sum > 0){
        return obj.sum;
      }else{
        return 0;
      }

    }catch(errors){
      console.log(errors)
      throw new InternalServerErrorException(errors.message);
    }
  };
}