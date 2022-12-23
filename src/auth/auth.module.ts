import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { usersProviders } from 'src/user/users.providers';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ...usersProviders],
  exports: [AuthService],
})
export class AuthModule {}
