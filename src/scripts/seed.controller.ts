// src/seed/seed.controller.ts
import { Controller, Get, Post } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  async seedQuestions() {
    try {
      await this.seedService.seedQuestions();
      return { message: 'Questions seeded successfully.' };
    } catch (error) {
      console.error('Error seeding questions:', error);
      throw new Error('Failed to seed questions');
    }
  }
}
