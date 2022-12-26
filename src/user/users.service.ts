import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    try {
      return this.usersRepository.create({
        ...user,
      });
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }

  async update(user: UpdateUserDTO, id: number): Promise<User> {
    try {
      const userSB = await this.usersRepository.findOne({
        where: { id: id },
      });
      return userSB.update({
        ...user,
      });
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findById(id: number): Promise<User> {
    try {
      return this.usersRepository.findOne({ where: { id: id } });
    } catch (errors) {
      throw new NotFoundException('Dado não encontrado !');
    }
  }
}
