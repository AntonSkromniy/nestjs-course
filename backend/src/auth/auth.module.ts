import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { JWTModule } from './jwt-module';

import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalAuthStrategy } from './local-auth-strategy';
import { JWTAuthStrategy } from './jwt-auth-strategy';

@Module({
  imports: [UserModule, PassportModule, JWTModule],
  providers: [AuthService, LocalAuthStrategy, JWTAuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
