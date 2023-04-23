import { IsNumber, IsInt } from "class-validator";

export class CreaterExpensesDTO {

  @IsNumber()
  value: number;

  @IsInt()
  month: number;

  @IsInt()
  year: number;

  @IsInt()
  userId: number;

  @IsInt()
  categoriesId: number;
}