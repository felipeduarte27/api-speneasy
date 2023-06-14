import { IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UserIdParamsDTO {
  @Type(() => Number)
  @IsPositive()
  userId: number;
}
