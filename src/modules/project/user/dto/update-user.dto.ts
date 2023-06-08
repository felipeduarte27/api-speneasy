import { IsString } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
