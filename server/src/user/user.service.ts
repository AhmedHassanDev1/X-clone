import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import { EditeUserDTO } from './dto/updateUser.dto';
import { FileType } from './user.controller';
import { CloudinaryService } from 'src/services/uploads/cloudinary.services';
import { Follow } from 'src/schemas/followers';
import { GraphQLError } from 'graphql';
@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private readonly userRepository: Model<User>,
        @InjectModel(Follow.name) private readonly followRepository: Model<Follow>,
        private readonly UploadService: CloudinaryService
    ) { }

    async create(userPayload: RegisterDTO): Promise<User> {
        let user = new this.userRepository(userPayload)
        await user.save()
        return user
    }

    async findById(id: string) {
        let user = await this.userRepository.findById(id)
        return user
    }

    async get_users(id: string, limit: number, offset: number) {
        let users = await this.userRepository.find({
            _id: { $ne: id }
        })
            .limit(limit)
            .skip(offset)
        return users
    }

    async findByEmail(email: string): Promise<User> {
        let user = await this.userRepository.findOne({ email })
        return user
    }


    async Edite(user_id: string, body: EditeUserDTO, userImage?: FileType, profileImage?: FileType) {
        let user = await this.userRepository.findById(user_id)
        // Update User Details
        await this.userRepository.updateOne({ _id: user_id }, { $set: body })

        // add or update user image 
        if (userImage) {
            let res = await this.UploadService.uploadSingleFile(userImage)
            let { public_id, secure_url, height, width } = res

            await this.userRepository.updateOne({ _id: user_id }, {
                $set: {
                    image: {
                        public_id,
                        url: secure_url,
                        width,
                        height
                    }
                }
            })
            if (user?.image) await this.UploadService.DeleteSingleFile(user?.image?.public_id)
        }
        // add or update profile image 
        if (profileImage) {
            let res = await this.UploadService.uploadSingleFile(profileImage)
            let { public_id, secure_url, height, width } = res
            await this.userRepository.updateOne({ _id: user_id }, {
                $set: {
                    profile_image: {
                        public_id,
                        url: secure_url,
                        width,
                        height
                    }
                }
            })
            if (user?.profile_image) await this.UploadService.DeleteSingleFile(user?.profile_image?.public_id)
        }

    }

    async follow(follower_id: string, following_id: string) {
        let userExist = await this.userRepository.findById(following_id)
        if (!userExist) throw new GraphQLError('the user not found')
        let isFollow = await this.followRepository.findOne({ follower: follower_id, following: following_id })
        if (isFollow) return
        await this.followRepository.create({ follower: follower_id, following: following_id })
        await this.userRepository.updateOne({ _id: follower_id }, { $inc: { count_following: 1 } })
        await this.userRepository.updateOne({ _id: following_id }, { $inc: { count_followers: 1 } })
    }
    async unfollow(follower_id: string, following_id: string) {
        let userExist = await this.userRepository.findById(following_id)
        if (!userExist) throw new GraphQLError('the user not found')
        let isFollow = await this.followRepository.findOne({ follower: follower_id, following: following_id })
        if (!isFollow) return
        await this.followRepository.create({ follower: follower_id, following: following_id })
        await this.userRepository.updateOne({ _id: follower_id }, { $inc: { count_following: -1 } })
        await this.userRepository.updateOne({ _id: following_id }, { $inc: { count_followers: -1 } })
    }
    async isFollow(follower_id: string, following_id: string) {
        let isFollow = await this.followRepository.findOne({ follower: follower_id, following: following_id })
        if (isFollow) return true
        else return false
    }
}
