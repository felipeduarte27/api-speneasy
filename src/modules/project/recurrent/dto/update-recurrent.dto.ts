import { PartialType } from '@nestjs/mapped-types';
import { CreateRecurrentDTO } from './create-recurrent.dto'

export class UpdateRecurrentDTO extends PartialType(CreateRecurrentDTO) {}