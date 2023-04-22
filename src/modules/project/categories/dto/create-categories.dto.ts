import { IsString, IsInt, IsBoolean, IsObject, IsOptional } from 'class-validator';

export class CreateCategoriesDTO {
  @IsString()
  name: string;

  @IsInt()
  userId: number;

  @IsBoolean()
  active: boolean;

  @IsOptional()
  @IsInt()
  categoriesId: number;

  @IsOptional()
  @IsObject()
  recurrent: object
}
