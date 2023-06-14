import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Incomes } from "./incomes.entity";
import { CreateUpdateIncomesDTO } from "./dto/create-update-incomes.dto";

@Injectable()
export class IncomesService {
  constructor(
    @Inject('INCOMES_REPOSITORY')
    private incomesRepository: typeof Incomes,   
  ){}

  async create(income: CreateUpdateIncomesDTO): Promise<Incomes>{
    try{
      
    const { value, active, userId } = income;
    return this.incomesRepository.create({value, active, userId});

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }

  async update(income: CreateUpdateIncomesDTO, id: number): Promise<Incomes>{
    try{
      
      const { value, active, userId } = income;
      const returnDB = await this.incomesRepository.findOne({
        where: { id: id },
      });

      return returnDB.update({
        value, active, userId
      });

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }

  async findActive(id: number): Promise<Incomes> {
    console.log('chegou aqui')
    return this.incomesRepository.findOne({where: {active: true, userId: id}});
  
  }
}