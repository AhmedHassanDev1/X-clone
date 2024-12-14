import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback ,Profile} from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy){
    constructor(readonly ConfigService:ConfigService){
         super({
            clientID: ConfigService.get<string>('GOOGLE_CLIENT_ID'),
            clientSecret:  ConfigService.get<string>('GOOGLE_CLIENT_SECRET'),
            callbackURL: ConfigService.get<string>('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
         })
     }
      
  async validate(accessToken:string, refresh_token:string,profile:Profile,done: VerifyCallback,){
    
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: name.givenName +" "+ name.familyName || "",
      picture: photos[0].value,
    };
    
    
    done(null, user);
       
       
  }

}
