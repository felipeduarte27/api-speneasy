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
import { IdParamsDTO } from 'src/modules/core/validation/id-params.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { LocalAuthGuard } from 'src/modules/core/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/modules/core/auth/jwt-auth.guard';
import { AuthService } from 'src/modules/core/auth/auth.service';
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

  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  async update(@Body() body: UpdateUserDTO, @Param() params: IdParamsDTO) {
    const { id } = params;
    return this.usersService.update(body, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('updatePassword/:id')
  async updatePassword(@Body() body: UpdateUserDTO, @Param() params: IdParamsDTO) {
    const { id } = params;
    return this.usersService.updatePassword(body, id);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Put('forgotPassword')
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
