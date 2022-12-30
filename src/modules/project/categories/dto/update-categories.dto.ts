import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriesDTO } from './create-categories.dto';

export class UpdateCategoriesDTO extends PartialType(CreateCategoriesDTO) {}
