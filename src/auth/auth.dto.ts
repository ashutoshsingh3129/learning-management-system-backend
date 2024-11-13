import { IsEmail, IsMobilePhone, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
   

    @IsEmail()
    @IsOptional()
    email: string;

  
}

