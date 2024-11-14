// src/tests/tests.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Test } from './schemas/test.schema';
import { Question } from '../question/schemas/question.schema';
import { v4 as uuidv4 } from 'uuid';
import { response } from 'express';

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
     let user =Types.ObjectId.createFromHexString(userId)

    const newTest = new this.testModel({ userId:user, currentQuestion: initialQuestion });
    let test= await newTest.save()
    return {test,initialQuestion};
  }
  async getAllTestResults(): Promise<Test[]> {
    const response = await this.testModel.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userInfo',
            },
        },
        {
            $unwind: '$userInfo',
        },
        {
            $addFields: {
                totalAttempts: { $size: '$attempts' },
                correctAttempts: {
                    $size: {
                        $filter: {
                            input: '$attempts',
                            as: 'attempt',
                            cond: { $eq: ['$$attempt.isCorrect', true] }
                        }
                    }
                },
            },
        },
        {
            $addFields: {
                score: {
                    $cond: {
                        if: { $gt: ['$totalAttempts', 0] },
                        then: { $multiply: [{ $divide: ['$correctAttempts', '$totalAttempts'] }, 100] },
                        else: 0
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                uniqueURL: 1,
                attempts: 1,
                correctStreak: 1,
                currentQuestion: 1,
                isCompleted: 1,
                'userInfo.name': 1,
                'userInfo.email': 1,
                score: { $round: ['$score', 2] }  // Rounding to 2 decimal places
            },
        },
    ]).exec();

    return response;
}

  async getTestResultWithScore(testId: string): Promise<{ test: Test; score: number }> {
    const test = await this.testModel.findById(testId).populate('userId', 'name email').exec();
    if (!test) {
      throw new NotFoundException('Test not found');
    }

    // Calculate the score
    const score = test.attempts.filter((attempt) => attempt.isCorrect).length;

    return { test, score };
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
