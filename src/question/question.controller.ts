// src/questions/questions.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from './schemas/question.schema';
import { AuthGuard } from '../auth/auth.guard'; // Use AuthGuard if necessary to restrict access

@Controller('question')
@UseGuards(AuthGuard)
export class QuestionController {
  constructor(private readonly questionsService: QuestionService) {}

  // Create a new question (admin only)
  @Post()
 // Protect this route if admin access is required
  async createQuestion(
    @Body() data: { difficulty: number; content: string; choices: Record<string, string>; correctAnswer: string },
  ): Promise<Question> {
    return this.questionsService.createQuestion(data);
  }

  // Get all questions (admin only)
  @Get()
  async getAllQuestions(): Promise<Question[]> {
    return this.questionsService.getAllQuestions();
  }

  // Get a single question by ID (admin only)
  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<Question> {
    return this.questionsService.getQuestionById(id);
  }

  // Update a question by ID (admin only)
  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() data: Partial<Question>,
  ): Promise<Question> {
    return this.questionsService.updateQuestion(id, data);
  }

  // Delete a question by ID (admin only)
  @Delete(':id')
  async deleteQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionsService.deleteQuestion(id);
  }
}
