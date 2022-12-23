export class CreateUserDto {
  name: string;
  email: number;
  password: string;
}

export class UpdateUserDto {
  id: number;
  name: string;
  email: number;
  password: string;
}
