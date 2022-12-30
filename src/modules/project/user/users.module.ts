import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { AuthModule } from 'src/modules/core/auth/auth.module';
import { DatabaseModule } from '../../core/database/database.module';
import { mailConfig } from 'src/config/mail.config';

@Module({
  imports: [DatabaseModule, AuthModule, mailConfig],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [],
})
export class UsersModule {}
