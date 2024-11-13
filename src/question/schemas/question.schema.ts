// src/questions/schemas/question.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  difficulty: number;

  @Prop({ required: true })
  content: string;

  // Array of choices for MCQ, where each choice has a key (A, B, C, D) and a value (the answer text).
  @Prop({
    type: Map,
    of: String,
    required: true,
    default: { A: '', B: '', C: '', D: '' },
  })
  choices: Record<string, string>;

  // Correct answer key, e.g., "B"
  @Prop({ required: true })
  correctAnswer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
