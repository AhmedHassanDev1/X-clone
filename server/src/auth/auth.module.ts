import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { EmailService } from './services/Nodemailer.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { UserService } from 'src/user/user.service';
import { CloudinaryService } from 'src/services/uploads/cloudinary.services';
import { Follow, followSchema } from 'src/schemas/followers';
@Module({
  imports: [MongooseModule.forFeature([
    {
      name: User.name,
      schema: userSchema
    },
    {

      name: Follow.name,
      schema: followSchema

    }
    ,]),
  JwtModule.registerAsync({
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<string>('JWT_EXPIRES_IN')
      }
    }),
    inject: [ConfigService],
  }),

  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    EmailService,
    CloudinaryService,
    ConfigService,
    GoogleStrategy,
  ],
})
export class AuthModule { }
