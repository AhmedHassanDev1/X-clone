import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { EditeUserDTO } from './dto/updateUser.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
export type FileType = Express.Multer.File

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {

  }

  @Put('edite')
  @UseInterceptors(FileFieldsInterceptor([
    { name: "userImage", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]))
  async EditeUser(
    @UploadedFiles() files: { userImage?: FileType[], profileImage?: FileType[] },
    @Body() body: EditeUserDTO,
    @CurrentUser() user: currentUsertype
  ) {

    let userImage = files?.userImage ? files?.userImage[0] : undefined
    let profileImage = files?.profileImage ? files?.profileImage[0] : undefined
    await this.userService.Edite(user?._id, body, userImage, profileImage)
  }
}
