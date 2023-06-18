import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Recurrents } from "./recurrents.entity";
import { CreateRecurrentDTO } from "./dto/create-recurrent.dto";

@Injectable()
export class RecurrentsService {
  constructor(
    @Inject('RECURRENTS_REPOSITORY')
    private recurrentsRepository: typeof Recurrents,   
  ){}

  async create(recurrent: CreateRecurrentDTO): Promise<Recurrents>{
    try{
      
    const { active, value, initialMonth, initialYear, finalMonth, finalYear, userId, categoriesId } = recurrent;
    return this.recurrentsRepository.create({ active, value, initialMonth, initialYear, finalMonth, finalYear, userId, categoriesId });

    }catch(errors){
      throw new InternalServerErrorException(errors.message);
    }
  }
}