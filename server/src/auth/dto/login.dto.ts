import { IsString,IsNotEmpty,IsEmail, IsOptional,MinLength ,MaxLength } from "class-validator";

export class LoginDTO{

    @IsNotEmpty({message:"Email is required."})
    @IsEmail({},{message:"Please enter a valid email address."})
    email:string
    
    @IsOptional()
    @IsString()
    @MinLength(8,{message:"Password must be at least 8 characters long."})
    password?:string
      
}