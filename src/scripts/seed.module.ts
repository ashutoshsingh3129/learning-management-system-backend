import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedService } from './seed.service';
import { Question, QuestionSchema } from 'src/question/schemas/question.schema';
import { SeedController } from './seed.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
  ],
  providers: [SeedService],
  controllers:[SeedController],
  exports: [SeedService],
})
export class SeedModule {}
