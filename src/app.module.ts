import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { TestController } from './test/test.controller';
import { TestService } from './test/test.service';
import { TestModule } from './test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { SeedService } from './scripts/seed.service';
import { SeedModule } from './scripts/seed.module';
import { AuthModule } from './auth/auth.module';
//import {SeedService} from './scripts/seed'
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      isGlobal: true,
      load: [configuration],
    }),
    JwtModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri')
      }),
      inject: [ConfigService],
    }),
    
    UserModule, QuestionModule, TestModule,SeedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService  ]//SeedService
})
export class AppModule {}
