// src/questions/questions.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<Question>,
  ) {}

  // Create a new question
  async createQuestion(data: {
    difficulty: number;
    content: string;
    choices: Record<string, string>;
    correctAnswer: string;
  }): Promise<Question> {
    const question = new this.questionModel(data);
    return question.save();
  }

  // Retrieve all questions
  async getAllQuestions(): Promise<Question[]> {
    return this.questionModel.find().exec();
  }

  // Retrieve a single question by ID
  async getQuestionById(id: string): Promise<Question> {
    const question = await this.questionModel.findById(id).exec();
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  // Update a question by ID
  async updateQuestion(id: string, data: Partial<Question>): Promise<Question> {
    const updatedQuestion = await this.questionModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    if (!updatedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return updatedQuestion;
  }

  // Delete a question by ID
  async deleteQuestion(id: string): Promise<Question> {
    const deletedQuestion = await this.questionModel.findByIdAndDelete(id).exec();
    if (!deletedQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return deletedQuestion;
  }
}
