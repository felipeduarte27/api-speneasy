import { Injectable, Inject, InternalServerErrorException } from "@nestjs/common";
import { Recurrents } from "./recurrents.entity";
import { CreateRecurrentDTO } from "./dto/create-recurrent.dto";
import { Categories } from "../categories/categories.entity";

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
}