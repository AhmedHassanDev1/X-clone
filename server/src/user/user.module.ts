import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/user';
import { UserResolver } from './user.resolver';
import { CloudinaryService } from 'src/services/uploads/cloudinary.services';
import { Follow, followSchema } from 'src/schemas/followers';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      },
      {
        name: Follow.name,
        schema: followSchema
      }
    ])

  ],
  controllers: [UserController],
  providers: [UserService, UserResolver, CloudinaryService],
})
export class UserModule { }
