
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDTO } from '../dto/register.dto';
import { Request } from 'express';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums'; 
@Injectable()
export class RegisterGuard implements CanActivate {
 constructor( 
     private readonly UserService:UserService
 ){} 
 async canActivate(
      context: ExecutionContext,
    ):  Promise<boolean>  {
      
    const request:Request = context.switchToHttp().getRequest();
    let body:RegisterDTO=request.body
  
    
    let {email,...other}=body
    let user=await this.UserService.findByEmail(email)
    if (!user) return true
    else throw new HttpException("email is already exists.",HttpStatus.CONFLICT) 
  }
}