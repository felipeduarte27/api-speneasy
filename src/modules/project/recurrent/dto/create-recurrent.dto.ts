import { IsNumber, IsInt, IsBoolean } from "class-validator";

export class CreateRecurrentDTO {

  @IsBoolean()
  active: boolean

  @IsNumber()
  value: number;

  @IsNumber()
  initialMonth: number;

  @IsNumber()
  initialYear: number;

  @IsNumber()
  finalMonth: number;

  @IsNumber()
  finalYear: number;

  @IsInt()
  userId: number;

  @IsNumber()
  categoriesId: number;
}