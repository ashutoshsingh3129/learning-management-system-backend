// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { faker } from '@faker-js/faker';
import { Question } from 'src/question/schemas/question.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  async seedQuestions() {
    const questions = [];

    // Generate 500 questions
    for (let i = 0; i < 500; i++) {
      // Random choices and correct answer for MCQ
      const choices = {
        A: faker.lorem.words(2),
        B: faker.lorem.words(2),
        C: faker.lorem.words(2),
        D: faker.lorem.words(2),
      };

      const correctAnswer = ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];

      questions.push({
        content: faker.lorem.sentence(),  // Random question content
        difficulty: Math.floor(Math.random() * 10) + 1,  // Random difficulty between 1 and 10
        choices,  // Array of choices
        correctAnswer,  // Correct answer (A, B, C, or D)
      });
    }

    // Insert questions into the database
    await this.questionModel.insertMany(questions);
    console.log('Inserted 500 questions into the database.');
  }
}
