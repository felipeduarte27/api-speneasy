import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Expenses } from "./expenses.entity";
import { CreaterExpensesDTO } from "./dto/create-expenses.dto";
import { Sequelize } from 'sequelize-typescript';
import { Categories } from "../categories/categories.entity";

type Object = {
  [key: string]: any; 
};

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSES_REPOSITORY')
    private expensesRepository: typeof Expenses,
    @Inject('SEQUELIZE')
    private sequelize: Sequelize
  ){}

  async create(expenses: CreaterExpensesDTO): Promise<Expenses>{
    try{
      
    const {value, month, year, userId, categoriesId} = expenses;
    return this.expensesRepository.create({value, month, year, userId, categoriesId});

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }

  async findTotalExpenseActualMonth(userId: number): Promise<number>{
    try{

      const date = new Date();
      const [results] = await this.sequelize.query(`
        select sum(value) from expenses e where e."user_id" = ${userId} and "month" = ${date.getMonth() + 1} and "year" = ${date.getFullYear()};
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

  async findTotalExpensesByPeriod(month: number, year: number, userId: number): Promise<number>{
    try{

      const [results] = await this.sequelize.query(`
        select sum(value) from expenses e where e."user_id" = ${userId} and "month" = ${month} and "year" = ${year};
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

  async findByPeriod(month: number, year: number, userId: number): Promise<Expenses[]>{
    try{

      return this.expensesRepository.findAll({
        where: { month: month, year: year, userId: userId},
        include: [
          {
            model: Categories,
            attributes: ['id', 'name'],
          }
        ]
      });

    }catch(errors){
      console.log(errors)
      throw new InternalServerErrorException(errors.message);
    }
  };

  async delete(id: number): Promise<any>{
    try{
      
      return this.expensesRepository.destroy({ where: { id: id }});

    }catch(errors){
      console.log(errors)
      throw new InternalServerErrorException(errors.message);
    }
  }
}