import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './schemas/test.schema';
import { TestController } from './test.controller';
import { TestService } from './test.service';
import { Question, QuestionSchema } from 'src/question/schemas/question.schema';
import { QuestionModule } from 'src/question/question.module';
import { JwtModule } from '@nestjs/jwt';
import { RequestContextModule } from 'src/shared/request-context/request-context.module';

@Module({
    imports:[
      MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]),
      MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
      QuestionModule,
      JwtModule,
      RequestContextModule
    ],
    controllers: [TestController],
    providers: [TestService  ]
  })
export class TestModule {
    
}
