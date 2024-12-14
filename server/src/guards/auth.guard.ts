import {Injectable,ExecutionContext, CanActivate, UnauthorizedException} from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql/dist/services"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(readonly reflector: Reflector,
                private readonly jwtService:JwtService  ) {}
   async canActivate(
        context: ExecutionContext,
      ): Promise<boolean>  {
        let isPublicClass=this.reflector.get<boolean>('isPublic',context.getClass())
        let isPublicHandler=this.reflector.get<boolean>('isPublic',context.getHandler())
        if(isPublicClass || isPublicHandler) return true
        let token:string|undefined
        let user
        let request:Request 
        try {
          if (context.getType()=='http') {
            request=context.switchToHttp().getRequest()
            token= request?.cookies?.access_token || undefined   
           
                               
        }else if(context.getType() as string =='graphql'){
                     
            let gqlContext= GqlExecutionContext.create(context)
            request=gqlContext.getContext().req   
            token=request?.headers?.authorization?.split(' ')[1] || undefined
        } 

        
        if (!token) throw new UnauthorizedException('You are not registered, you must log in.')
        if (typeof token == 'string') {
           let invalid_token= this.jwtService.verify(token)
           if (invalid_token) {
            user=invalid_token
           }
           else {
             throw new UnauthorizedException('Invalid token,you must log in.') 
           }
        }
   
        } catch (error) {
            return false       
        }
        
        request['user'] = user
        return true
       
      }
}