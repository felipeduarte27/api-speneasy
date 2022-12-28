import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { IdParamsDTO } from 'src/pipe-validation/id-params.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('findAll')
  async getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findById/:id')
  async getById(@Param() params: IdParamsDTO) {
    const { id } = params;
    return this.usersService.findById(id);
  }

  @Post('createUser')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updateUser/:id')
  async update(@Body() body: UpdateUserDTO, @Param() params: IdParamsDTO) {
    const { id } = params;
    return this.usersService.update(body, id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() body: ForgotPasswordDTO) {
    const { email } = body;
    return this.usersService.forgotPassword(email);
  }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param() params: IdParamsDTO,
  ) {
    console.log(params);
    console.log(file);
  }
}
