import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
    private mailerService: MailerService,
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

  async updatePassword(user: UpdateUserDTO, id: number): Promise<User> {
    try {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 8);
        const userSB = await this.usersRepository.findOne({
          where: { id: id },
        });
        return userSB.update({
          ...user,
          fields: ['password']
        });
      }
      else{
        throw {message: "Password not found"};
      }
    } catch (errors) {
      console.log(errors.message)
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

  async sendEmail(email: string, newPassword: string, name: string) {
    this.mailerService.sendMail({
      to: email,
      from: 'suporte@speneasy.com',
      subject: 'Recuperação de Senha - Speneasy',
      html: `<h4>Olá ${name},</h4>
             <br>
             Sua Solicitação de recuperação de senha foi processada.
             <br>
             <br>
             Sua nova senha é: <b>${newPassword}</b>
             <br>
             <br>             
             <i>Este email foi gerando automaticamente e não deve ser respondido.</i>            
             `,
    });
  }

  async forgotPassword(email: string) {
    try {
      const tempPassword = Math.random().toString(36).slice(-10);
      console.log(tempPassword);
      const cryptedPassword = await bcrypt.hash(tempPassword, 8);
      const userDB = await this.usersRepository.findOne({ where: { email } });
      const dataDB = await userDB.update({
        password: cryptedPassword,
        fields: ['password']
      });
      if (dataDB) {
        const { name } = dataDB.dataValues;
        //this.sendEmail(email, tempPassword, name);
      }
      return dataDB;
    } catch (errors) {
      throw new InternalServerErrorException(errors.message);
    }
  }
}
