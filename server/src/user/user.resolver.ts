import { Args, Query, Parent, Resolver, ResolveField, Context, Mutation, ID, Int } from "@nestjs/graphql";

import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { CurrentUser } from "src/decorators/currentUser.decorator";

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) { }
  @Query(() => UserEntity)
  async me(@Context() ctx) {

    let ME: currentUsertype = ctx.req.user
    let user = await this.userService.findById(ME._id)
    return user
  }

  @Query(() => UserEntity, { nullable: true })
  async user_details(@Args('id') id: string) {
    let user = await this.userService.findById(id)
    return user
  }

  @Query(() => [UserEntity], { nullable: true })
  async users(@Context() ctx,
  @Args('limit', { type: () => Int, nullable: true }) limit: number = 20,
  @Args('offset', { type: () => Int, nullable: true }) offset: number = 0) {
    let ME: currentUsertype = ctx.req.user
    let users = await this.userService.get_users(ME._id,limit,offset)
    return users
  }
  
  @Mutation((type) => ID, { nullable: true })
  async follow(@Args('id') id: string, @Context() ctx) {
    let user = ctx.req.user
    await this.userService.follow(user?._id, id)
  }

  @Mutation((type) => ID, { nullable: true })
  async unfollow(@Args('id') id: string, @Context() ctx) {
    let user = ctx.req.user
    await this.userService.unfollow(user?._id, id)
  }

  @ResolveField()
  async image(@Parent() user: UserEntity) {
    const { image } = user;
    return image ? image['url'] : null
  }

  @ResolveField()
  async profile_image(@Parent() user: UserEntity) {
    const { profile_image } = user;
    return profile_image ? profile_image['url'] : null
  }

  @ResolveField()
  async is_follow(@Parent() parent: UserEntity, @Context() ctx) {
    let user = ctx.req.user
    let isFollow = await this.userService.isFollow(user?._id, parent._id)
    return isFollow
  }
} 