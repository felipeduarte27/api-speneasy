import { IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class IdParamsDTO {
  @Type(() => Number)
  @IsPositive()
  id: number;
}
