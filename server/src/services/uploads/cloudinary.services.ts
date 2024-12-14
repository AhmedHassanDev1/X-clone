import { Injectable } from "@nestjs/common"

import { FileType } from "src/user/user.controller"
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { ConfigService } from "@nestjs/config"
import { PassThrough } from "stream"

@Injectable()
export class CloudinaryService {
  constructor(
    private readonly configService: ConfigService
  ) {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUD_NAME'),
      api_key: configService.get<string>('API_KEY'),
      api_secret: configService.get<string>('API_SECRET'),
      secure: true
    })


  }

  async uploadSingleFile(file: FileType): Promise<UploadApiResponse> {
    return new Promise((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            return rej(error);
          }
          res(result);
        },
      );
      const stream = new PassThrough();
      stream.end(file.buffer);
      stream.pipe(uploadStream);
    })
  }
  async uploadMultiFiles(files: FileType[]) {
    let resultes = []
    for (const file of files) {
      let res: UploadApiResponse = await this.uploadSingleFile(file)
      let { public_id, secure_url, width, height, resource_type } = res
      resultes.push({ public_id, url: secure_url, width, height, type: resource_type })
    }

    return resultes
  }
  async DeleteSingleFile(public_id: string) {
    await cloudinary.uploader.destroy(public_id)
  }
  async DeleteMultiFiles(public_ids: string[]) { }
}