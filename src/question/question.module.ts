import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';
import { QuestionService } from './question.service';
import { JwtModule } from '@nestjs/jwt';
import { RequestContextModule } from 'src/shared/request-context/request-context.module';

@Module({
  imports:[    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),JwtModule,
  RequestContextModule

],
  controllers: [QuestionController],
  providers:[QuestionService]
})
export class QuestionModule {}
