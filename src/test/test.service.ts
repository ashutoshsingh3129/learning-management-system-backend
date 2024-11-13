// src/tests/tests.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test } from './schemas/test.schema';
import { Question } from '../question/schemas/question.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TestService {
  constructor(
    @InjectModel('Test') private readonly testModel: Model<Test>,
    @InjectModel('Question') private readonly questionModel: Model<Question>,
  ) {}

  async createTest(testData: any): Promise<Test> {
    const uniqueURL = uuidv4(); // Generate a unique identifier
    const newTest = new this.testModel({
      ...testData,
      uniqueURL,
    });
    return newTest.save();
  }
  async startTest(userId: string) {
    const initialQuestion = await this.questionModel.findOne({ difficulty: 5 });
    const newTest = new this.testModel({ userId, currentQuestion: initialQuestion });
    let test= await newTest.save()
    return {test,initialQuestion};
  }

  async submitAnswer(testId: string, questionId: string, userAnswer: string) {
    console.log("test",testId)
    console.log("ques",questionId)
    console.log("userA",userAnswer)
    const test:any = await this.testModel.findById(testId);
    const currentQuestion = await this.questionModel.findById(questionId);

    // Check if the user's answer matches the correct answer
    console.log("ttt",test)
    console.log("curre",currentQuestion)
    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    // Determine next question's difficulty
    let nextDifficulty = currentQuestion.difficulty;
    if (isCorrect) {
      nextDifficulty = Math.min(nextDifficulty + 1, 10);
      test.correctStreak++;
    } else {
      nextDifficulty = Math.max(nextDifficulty - 1, 1);
      test.correctStreak = 0;
    }

    // Fetch the next question based on new difficulty
    const nextQuestion = await this.questionModel.findOne({ difficulty: nextDifficulty });

    // Update test state
    test.attempts.push({
      question: questionId,
      userAnswer: userAnswer,
      isCorrect: isCorrect,
    });
    test.currentQuestion = nextQuestion;
    
    // Check if test should end
    if (
      test.attempts.length >= 20 || // Condition 1: 20 questions attempted
      (!isCorrect && nextDifficulty === 1) || // Condition 2: incorrect answer on difficulty 1
      (test.correctStreak === 3 && nextDifficulty === 10) // Condition 3: 3 correct at difficulty 10
    ) {
      test.isCompleted = true;
    }

    await test.save();
    return {test,currentQuestion:nextQuestion};
  }
}
