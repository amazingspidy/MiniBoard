import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { GoogleStrategy  } from './google.strategy';
import { AutenticatedGuard, GoogleAuthGuard, OrGuards } from './auth.guard';

@Module({
  imports: [UserModule, PassportModule.register({ session: true})],
  providers: [AuthService, LocalStrategy, SessionSerializer, GoogleStrategy, AutenticatedGuard, GoogleAuthGuard, OrGuards],
  controllers: [AuthController],
  exports: [OrGuards],
})
export class AuthModule {}
