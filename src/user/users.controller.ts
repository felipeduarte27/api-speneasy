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
import { CreateUserDto } from './dto/user.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  async getAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById/:id')
  async getById(@Param() params) {
    const { id } = params;
    return this.usersService.findById(id);
  }

  @Post('createUser')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateUser/:id')
  async update(@Body() body: CreateUserDto, @Param() params) {
    const { id } = params;
    return this.usersService.update(body, id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
