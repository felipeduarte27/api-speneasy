import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Expenses } from "./expenses.entity";
import { CreaterExpensesDTO } from "./dto/create-expenses.dto";
import { Sequelize } from 'sequelize-typescript';

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

  async findTotalExpenseActualMonth(): Promise<number>{
    try{

      const date = new Date();
      const [results] = await this.sequelize.query(`
        select sum(value) from expenses e where "month" = ${date.getMonth() + 1} and "year" = ${date.getFullYear()};
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

  async findTotalExpensesByPeriod(month: number, year: number): Promise<number>{
    try{

      const [results] = await this.sequelize.query(`
        select sum(value) from expenses e where "month" = ${month} and "year" = ${year};
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