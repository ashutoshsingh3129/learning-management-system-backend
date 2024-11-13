// src/tests/tests.controller.ts
import { Controller, Post, Param, Body, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequestContextService } from 'src/shared/request-context/request-context.service';

@Controller('tests')
@UseGuards(AuthGuard)
export class TestController {
  constructor(private readonly testsService: TestService,

    private requestContextService:RequestContextService

  ) {}

  // @Post(':testId/start')
  // startTest(@Body('userId') userId: string) {
  //   return this.testsService.startTest(userId);
  // }
  @Post('register')
  registerTest( @Body('userId') userId: string) {
    console.log("uu",userId)
    let user=this.requestContextService.get('userId')
    console.log("uu",user)
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
}
