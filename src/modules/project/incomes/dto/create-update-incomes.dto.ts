import { IsNumber, IsInt, IsBoolean } from "class-validator";

export class CreateUpdateIncomesDTO {

  @IsNumber()
  value: number;

  @IsBoolean()
  active: boolean

  @IsInt()
  userId: number;
}