import { Args, Context, ID, Int, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { TweetEntity, Media } from './entity/tweet';
import { TweetService } from './tweet.service';
import { NotificationsEntity } from './entity/notifications';
@Resolver(() => TweetEntity)
export class TweetResolver {
    constructor(private readonly TweetService: TweetService) { }

    @Query(() => [TweetEntity])
    async get_user_Tweet(
        @Args('id') id: string,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset: number = 0) {
        let tweets = await this.TweetService.getUserTweet(id, limit, offset)
        return tweets
    }

    @Query(() => [TweetEntity])
    async get_Tweets(
        @Context() ctx,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset: number = 0) {
        let ME: currentUsertype = ctx.req.user

        let tweets = await this.TweetService.getTweets(ME._id, limit, offset)
        return tweets
    }
    @Query(() => TweetEntity, { nullable: true })
    async get_tweet_by_id(@Args('tweet_id') id: string) {
        let tweet = await this.TweetService.getTweetById(id)
        return tweet
    }

    @Query(() => [TweetEntity], { nullable: true })
    async get_likes(@Context() ctx,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset: number = 0) {
        let user = ctx.req.user

        let tweet = await this.TweetService.getlikes(user?._id, limit, offset)
        return tweet
    }

    @Query(() => [TweetEntity], { nullable: true })
    async get_bookmarks(@Context() ctx,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset: number = 0) {
        let user = ctx.req.user

        let tweet = await this.TweetService.getbookmarks(user?._id, limit, offset)
        return tweet
    }

    @Query(() => [Media], { nullable: true })
    async get_media(@Args('id') id: string,
        @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
        @Args('offset', { type: () => Int, nullable: true }) offset: number = 0) {
        let media = await this.TweetService.get_media(id, limit, offset)
        return media[0]?.allMedia || [];
    }

    @Mutation(() => NotificationsEntity)
    async add_like(@Context() ctx, @Args('tweet_id') tweet_id: string) {
        let user = ctx.req.user
        await this.TweetService.addLike(user?._id, tweet_id)
        return { user_id: user?._id, tweet_id }
    }

    @Mutation(() => ID)
    async remove_like(@Context() ctx, @Args('tweet_id') tweet_id: string) {
        let user = ctx.req.user
        await this.TweetService.removeLike(user?._id, tweet_id)
        return tweet_id
    }

    @Mutation(() => NotificationsEntity)
    async bookmarks(@Context() ctx, @Args('tweet_id') tweet_id: string) {
        let user = ctx.req.user
        await this.TweetService.bookmarks(user?._id, tweet_id)
        return { user_id: user?._id, tweet_id }
    }

    @Mutation(() => NotificationsEntity)
    async unbookmarks(@Context() ctx, @Args('tweet_id') tweet_id: string) {
        let user = ctx.req.user
        await this.TweetService.unbookmarks(user?._id, tweet_id)
        return { user_id: user?._id, tweet_id }
    }

    @ResolveField()
    async is_like(@Context() ctx, @Parent() parent: TweetEntity) {
        let user = ctx.req.user
        let isLike = await this.TweetService.isLike(user?._id, parent._id)
        return isLike
    }
    @ResolveField()
    async is_bookmarks(@Context() ctx, @Parent() parent: TweetEntity) {
        let user = ctx.req.user
        let isBookmarks = await this.TweetService.isBookmark(user?._id, parent._id)
        return isBookmarks
    }

    @ResolveField()
    async original_tweet(@Context() ctx, @Parent() parent: TweetEntity) {
        if (parent.original_tweet) {
            let Tweet = await this.TweetService.getTweetById(parent?._id)
            return Tweet
        }
        return null;
    }


}
