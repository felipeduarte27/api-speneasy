import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from '../user/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
