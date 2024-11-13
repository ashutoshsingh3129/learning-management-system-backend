import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import { createHashValue } from 'src/common/utils/utilities';
import { UserService } from 'src/user/user.service';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto, res: any) {
    console.log("loghfg ",loginDto)
    const user = await this.usersService.login(loginDto.email,loginDto.password);
    const password = createHashValue(loginDto.password);
    console.log("ppp",password)
    console.log("uuu",user.password)
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }    
   
    const payload = {
      email: user.email,
      role:user.role,
      userId: user._id,
    };
    const accessToken: string = await this.jwtService.signAsync(payload);
    res.setHeader('x-access-token',accessToken);
    return {
      userId: user._id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      role:user.role,
      accessToken: accessToken,
    }
  }
}
