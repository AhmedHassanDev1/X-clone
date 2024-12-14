import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { FileType } from 'src/user/user.controller';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { CreateTweetDTO } from './dto/createTweet';

@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) { }

  @Post('create')
  @UseInterceptors(FilesInterceptor('files', 4, { limits: { fileSize: 1024 * 1024 * 50 } }))
  async create(
    @UploadedFiles() Files: FileType[],
    @CurrentUser() user: currentUsertype,
    @Body() body: CreateTweetDTO
  ) {

    let tweet = await this.tweetService.create(user._id, body, Files)
    return tweet
  }

}
