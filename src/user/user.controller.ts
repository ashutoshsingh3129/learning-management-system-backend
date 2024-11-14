// src/users/users.controller.ts
import { Controller, Post, Body, HttpCode, ForbiddenException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/auth.guard'; // optional for protecting routes with JWT
import { UseGuards } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly usersService: UserService, private jwtService: JwtService) {}

  // Register route
  @Post('/register')
  async register(@Body() body: { username: string; password: string ,name:string, email:string,mobile:string}) {
    const user = await this.usersService.register(body);
    return user
  }

  // Login route
  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.usersService.login(email, password);
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const token = await this.usersService.generateJwtToken(user);
    return { message: 'Login successful', token };
  }
}
