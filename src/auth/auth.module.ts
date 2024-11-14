import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RequestContextModule } from 'src/shared/request-context/request-context.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '12h' },
    }),
    RequestContextModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
