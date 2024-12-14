import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/services/uploads/cloudinary.services';
import { CreateTweetDTO } from './dto/createTweet';
import { FileType } from 'src/user/user.controller';
import { InjectModel } from '@nestjs/mongoose';
import { Tweet } from 'src/schemas/tweet';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/user';
import { Likes } from 'src/schemas/likes';
import { GraphQLError } from 'graphql';
import { Bookmarks } from 'src/schemas/bookmarks';

@Injectable()
export class TweetService {

    constructor(
        private readonly uploadService: CloudinaryService,
        @InjectModel(Tweet.name) private readonly TweetRepository: Model<Tweet>,
        @InjectModel(User.name) private readonly UserRepository: Model<User>,
        @InjectModel(Likes.name) private readonly LikesRepository: Model<Likes>,
        @InjectModel(Bookmarks.name) private readonly BookmarksRepository: Model<Bookmarks>,

    ) { }

    async create(user_id: string, content: CreateTweetDTO, files: FileType[]) {
        let newtweet = new this.TweetRepository({ user: user_id, ...content })
        let media = await this.uploadService.uploadMultiFiles(files)
        await newtweet.save()
        let Tweet = await this.TweetRepository.findOneAndUpdate({ _id: newtweet?._id }, {
            $set: {
                media
            }
        }, { new: true })
        await this.UserRepository.updateOne({ _id: user_id }, {
            $inc: {
                count_media: media?.length,
                count_tweets: 1
            }
        })
        if (['retweet', 'replay'].includes(content?.type) || content?.original_tweet_id) {
            if (content?.type === 'replay') {
                await this.TweetRepository.updateOne({ _id: content?.original_tweet_id }, { $inc: { count_replaies: 1 } })
            } else {
                await this.TweetRepository.updateOne({ _id: content?.original_tweet_id }, { $inc: { count_reposts: 1 } })
            }
            await this.TweetRepository.updateOne({ _id: newtweet?._id }, {
                $set: {
                    original_tweet: content?.original_tweet_id
                }
            }, { new: true })
        }
        return Tweet
    }

    async getUserTweet(user_id: string, limit: number, offset: number) {
        let Tweets = await this.TweetRepository.find({ user: user_id })
            .populate({
                path: 'user',
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)
        return Tweets
    }
    async getTweets(user_id: string, limit: number, offset: number) {
        let Tweets = await this.TweetRepository.find({
            user: { $ne: user_id }
        })
            .populate({
                path: 'user',
            })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(offset)
        return Tweets
    }

    async getbookmarks(user_id: string, limit: number, offset: number) {
        let Tweets = await this.TweetRepository.find({
            'bookmarks.user': user_id
        }).populate({
            path: 'user',
        })
            .sort({ 'bookmarks.bookmarkedAt': -1 })
            .limit(limit)
            .skip(offset)


        return Tweets
    }

    async getlikes(user_id: string, limit: number, offset: number) {
        let Tweets = await this.TweetRepository.find({
            'likes.user': user_id
        })
            .populate({
                path: 'user',
            })
            .sort({ 'likes.likedAt': -1 })
            .limit(limit)
            .skip(offset)



        return Tweets
    }

    async get_media(user_id: string, limit: number, offset: number) {
        const result = await this.TweetRepository.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(user_id) },
            },
            {
                $project: {
                    media: 1,
                },
            },
            {
                $unwind: "$media"
            },

            {
                $skip: offset,
            },
            {
                $limit: limit,
            },
            {
                $group: {
                    _id: null,
                    allMedia: { $addToSet: "$media" }
                }
            }

        ]);
        return result
    }

    async getTweetById(tweet_id: string) {
        try {
            let Tweet = await this.TweetRepository.findById(tweet_id).populate('user')
            return Tweet
        } catch (err) {
            return null
        }
    }



    async addLike(user_id: string, tweet_id: string) {
        let tweet = await this.TweetRepository.findById(tweet_id)
        if (!tweet) throw new GraphQLError('tweet not found')
        await this.LikesRepository.create({ user: user_id, tweet: tweet_id })
        await this.TweetRepository.updateOne({ _id: tweet_id }, {
            $inc: {
                count_likes: 1
            },
            $addToSet: {
                likes: {
                    user: user_id,
                    likedAt: new Date()
                }
            }
        })
    }

    async removeLike(user_id: string, tweet_id: string) {
        let tweet = await this.TweetRepository.findById(tweet_id)
        if (!tweet) throw new GraphQLError('the tweet not found')
        await this.LikesRepository.deleteOne({ user: user_id, tweet: tweet_id })
        await this.TweetRepository.updateOne({ _id: tweet_id }, {
            $inc: {
                count_likes: -1
            },
            $pull: { likes: { user: user_id } },
        })
    }
    async bookmarks(user_id: string, tweet_id: string) {
        let tweet = await this.TweetRepository.findById(tweet_id)
        if (!tweet) throw new GraphQLError('the tweet not found')
        let isBookmarks = await this.isBookmark(user_id, tweet_id)
        if (isBookmarks) return
        await this.BookmarksRepository.create({ user: user_id, tweet: tweet_id })
        await this.TweetRepository.updateOne({ _id: tweet_id }, {
            $addToSet: {
                bookmarks: {
                    user: user_id,
                    likedAt: new Date()
                }
            }
        })
    }
    async unbookmarks(user_id: string, tweet_id: string) {
        let tweet = await this.TweetRepository.findById(tweet_id)
        if (!tweet) throw new GraphQLError('the tweet not found')
        await this.BookmarksRepository.deleteOne({ user: user_id, tweet: tweet_id })
        await this.TweetRepository.updateOne({ _id: tweet_id }, {
            $pull: {
                bookmarks: { user: user_id }
            },
        })
    }

    async isLike(user_id: string, tweet_id: string) {
        let islike = await this.LikesRepository.findOne({ user: user_id, tweet: tweet_id })
        if (islike) return true
        else return false
    }

    async isBookmark(user_id: string, tweet_id: string) {
        let isbookmark = await this.BookmarksRepository.findOne({ user: user_id, tweet: tweet_id })
        if (isbookmark) return true
        else return false
    }



}
