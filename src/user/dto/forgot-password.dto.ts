import { IsString } from 'class-validator';

export class ForgotPasswordDTO {
  @IsString()
  email: string;
}
