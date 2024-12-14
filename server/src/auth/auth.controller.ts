import { Controller, Get, Post , SetMetadata , Delete , Req, Res , Body , Param , UseGuards, HttpStatus } from '@nestjs/common';
import {Request,Response} from "express"
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { RegisterGuard } from './guards/register.guard';
import { LoginGuard } from './guards/login.guard';
import { RegisterDTO } from './dto/register.dto';
import { cookiesOption } from './options/cookie';
import { LoginDTO } from './dto/login.dto';

export const token_name='access_token' 


@Controller('auth')
@SetMetadata('isPublic',true)
export class AuthController {
  constructor( 
               private readonly authService: AuthService ,               
               ) {}
  // OAuth google
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}
   
  @Get('oauth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Res() res: Response , @Req() req) {
    await this.authService.LoginByGoogle(req.user)
    
    
 } 

  // Create New Account   
  @Post('register')
  @UseGuards(RegisterGuard)
  async register(@Body() body:RegisterDTO,@Res({passthrough:true}) res: Response): Promise<void>{
   
    
    let token=await this.authService.register(body)
    res.status(HttpStatus.NO_CONTENT).cookie(token_name,token,cookiesOption)    
  }
  
  // Login By Password with Email
  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Body() body:LoginDTO,@Res({passthrough:true}) res: Response): Promise<void>{
    let token= await this.authService.login(body)
    res.status(HttpStatus.NO_CONTENT).cookie(token_name,token,cookiesOption)    
  }
  
  // Clear cookies from access_token
  @Delete('logout')
  async logout(@Res({passthrough:true}) res: Response): Promise<void>{
     res.status(HttpStatus.OK).clearCookie(token_name)
  }

 
}