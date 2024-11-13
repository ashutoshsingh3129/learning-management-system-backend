// src/tests/schemas/test.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Test extends Document {
  @Prop({ required: true, ref:'users' })
  userId: mongoose.Types.ObjectId;
  @Prop({ required: true, unique: true, default: uuidv4 })
  uniqueURL: string;

  @Prop({ default: [] })
  attempts: {
    question: string;
    userAnswer: string;     // Store user's selected choice (e.g., "A")
    isCorrect: boolean;     // Whether the answer was correct
  }[];

  @Prop({ default: 0 })
  correctStreak: number;

  @Prop({ default: null })
  currentQuestion: string;

  @Prop({ default: false })
  isCompleted: boolean;
}

export const TestSchema = SchemaFactory.createForClass(Test);
