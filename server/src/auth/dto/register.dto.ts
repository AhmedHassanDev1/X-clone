import { IsString,IsNotEmpty,IsEmail, IsOptional,MinLength ,MaxLength } from "class-validator";


export class RegisterDTO{

     
    @IsNotEmpty({message:"Name is required."})
    @MaxLength(50,{message:"Name must be less than 50 characters."})
    name:string
    
    @IsNotEmpty({message:"Email is required."})
    @IsEmail({},{message:"Please enter a valid email address."})
    email:string
    
    @IsOptional()
    @IsString()
    @MinLength(8,{message:"Password must be at least 8 characters long."})
    password?:string
    
    @IsOptional()
    date_birth?:string

   
}