import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from './auth.constants';
import { RequestContextService } from 'src/shared/request-context/request-context.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private requestContextService: RequestContextService,

  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log("tokke",token)
    let payload: any = {};
    if (!token) {
     throw new UnauthorizedException();
    }
    try {
      payload = await this.jwtService.verifyAsync(token,{secret:jwtConstants.secret});
    } catch (error) {
      console.log("error",error)
      throw new UnauthorizedException('Token Expired');
    }
   
 
    this.requestContextService.set<string>('userId', payload.userId);
    this.requestContextService.set<string>('role', payload.role);
    this.requestContextService.set<string>('token', token);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
