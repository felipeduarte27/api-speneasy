import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Expenses } from "./expenses.entity";
import { CreaterExpensesDTO } from "./dto/create-expenses.dto";

@Injectable()
export class ExpensesService {
  constructor(
    @Inject('EXPENSES_REPOSITORY')
    private expensesRepository: typeof Expenses,
  ){}

  async create(expenses: CreaterExpensesDTO): Promise<Expenses>{
    try{
    const {value, month, year, userId, categoriesId} = expenses;
    return this.expensesRepository.create({value, month, year, userId, categoriesId});
    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }
}