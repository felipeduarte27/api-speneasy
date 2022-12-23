import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [],
})
export class UsersModule {}