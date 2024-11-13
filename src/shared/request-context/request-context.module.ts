import { Module } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ JwtModule],
  providers: [RequestContextService],
  exports: [RequestContextService],
  
})
export class RequestContextModule {}
