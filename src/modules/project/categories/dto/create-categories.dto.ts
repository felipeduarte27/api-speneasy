import { IsString, IsInt } from 'class-validator';

export class CreateCategoriesDTO {
  @IsString()
  name: string;

  @IsInt()
  userId: number;
}
