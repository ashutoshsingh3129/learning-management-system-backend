// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';
import { createHashValue } from 'src/common/utils/utilities';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // Register a new user
  async register(payload:any): Promise<User> {
    
    let password= createHashValue(payload.password)
    payload={...payload,password}
    const user = new this.userModel(payload);
    return user.save();
  }

  // Validate user credentials for login
  async login(email: string, password: string): Promise<User | null> {
    console.log("ee",email)
    const user = await this.userModel.findOne({ email }).exec();
    console.log("uuu",user)
  //  if (user && (await bcrypt.compare(password, user.password))) {
      return user;
   // }
  }

  // Generate JWT token
  async generateJwtToken(user: User): Promise<string> {
    const payload = { username: user.email };
    return this.jwtService.sign(payload);
  }
}
