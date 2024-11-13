import { Body, Controller, HttpCode, HttpStatus, Post, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Response() res: any) {
    const response:any = await this.authService.login(loginDto, res);
    res.status(HttpStatus.OK).send(response);
  } 
}
