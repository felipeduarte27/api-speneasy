import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const dataDB = await this.usersRepository.create({
      ...user,
    });

    return dataDB;
  }

  async update(user: UpdateUserDto): Promise<User> {
    const userSB = await this.usersRepository.findOne({
      where: { id: user.id },
    });
    const dataDB = await userSB.update({
      ...user,
    });

    return dataDB;
  }

  async findAll(): Promise<User[]> {
    const allUsers = await this.usersRepository.findAll();
    return allUsers;
  }

  async findById(id: number): Promise<User> {
    const dataDB = this.usersRepository.findOne({ where: { id: id } });
    return dataDB;
  }
}