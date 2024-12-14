import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { CloudinaryService } from 'src/services/uploads/cloudinary.services';
import { MongooseModule } from '@nestjs/mongoose';
import { Tweet, tweetSchema } from 'src/schemas/tweet';
import { User, userSchema } from 'src/schemas/user';
import { TweetResolver } from './tweet.resolver';
import { Likes, likesSchema } from 'src/schemas/likes';
import { Bookmarks, bookmarksSchema } from 'src/schemas/bookmarks';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      },
      {
        name: Tweet.name,
        schema: tweetSchema
      },
      {
        name: Likes.name,
        schema: likesSchema
      },
      {
        name: Bookmarks.name,
        schema: bookmarksSchema
      }
    ])
  ],
  controllers: [TweetController],
  providers: [TweetService, CloudinaryService, TweetResolver],
})
export class TweetModule { }
