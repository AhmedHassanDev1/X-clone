import { Injectable ,UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { RegisterDTO } from '../dto/register.dto';
import { User } from 'src/schemas/user';
import { hash , compare , genSalt } from 'bcryptjs';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly UserService:UserService,
        private readonly JwtService :JwtService,
        private readonly ConfigService:ConfigService   
    ){}
  
  createTokenPayload(obj:User,keys:string[]){
    
    return keys.reduce((resulte,key)=> {
          if(key in obj ) resulte[key]=obj[key]  
          return resulte
    },{})
  }  
  async register(body:RegisterDTO): Promise<string> {
        
        let {password,...others}=body
        let salt=await genSalt()
        let hashingPassword=await hash(password,salt)
        let user =await this.UserService.create({...others,password:hashingPassword})
        let payload=this.createTokenPayload(user,['name','email','_id']);
        let token:string=this.JwtService.sign(payload)
        return token
   }

  async login({email,password}:LoginDTO): Promise<string>{
    let user=await this.UserService.findByEmail(email)
    let validpassword=await compare(password,user.password) 
    if(!validpassword) throw new UnauthorizedException('invalid password.')

    let payload=this.createTokenPayload(user,['name','email','_id']);
    let token:string=this.JwtService.sign(payload)
    return token
  }
  
  async LoginByGoogle({name,email,picture}:{name:string,email:string,picture:string}): Promise<string>{
        let user:User;    
        user=await this.UserService.findByEmail(email)
        if (!user) {
            user = await this.UserService.create({name,email})           
        }

        let payload=this.createTokenPayload(user,['name','email','_id']);
        let token:string=this.JwtService.sign(payload)
        return token
  }
  
}
