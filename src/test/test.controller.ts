// src/tests/tests.controller.ts
import { Controller, Post, Param, Body, UseGuards, Get } from '@nestjs/common';
import { TestService } from './test.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestContextService } from 'src/shared/request-context/request-context.service';
import { Types } from 'mongoose';

@Controller('tests')
@UseGuards(AuthGuard)
export class TestController {
  constructor(private readonly testsService: TestService,

    private requestContextService:RequestContextService

  ) {}

  @Post('register')
  registerTest( @Body('userId') userId: string) {
    return this.testsService.startTest(userId);
  }

  @Post(':testId/questions/:questionId/answer')
  submitAnswer(
    @Param('testId') testId: string,
    @Param('questionId') questionId: string,
    @Body('userAnswer') userAnswer: string,
  ) {
    return this.testsService.submitAnswer(testId, questionId, userAnswer);
  }

  @Get(':testId/result')
  async getTestResultWithScore(@Param('testId') testId: string) {
    return this.testsService.getTestResultWithScore(testId);
  }
  @Get('/result')
  async getAllTestResults() {
    return this.testsService.getAllTestResults();
  }

}

