import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/users.interface';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('findAll')
  async getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('findById/:id')
  async getById(@Param() params): Promise<User> {
    const { id } = params;
    return this.usersService.findById(id);
  }

  @Post('createUser')
  async create(@Body() body: CreateUserDto): Promise<User> {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateUser')
  async update(@Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
