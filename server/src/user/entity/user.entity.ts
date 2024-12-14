

import { Field, Int, ObjectType } from '@nestjs/graphql';



@ObjectType()
export class UserEntity {
  @Field()
  _id: string;

  @Field()
  name: string;

  @Field()
  email: string;
  
  @Field({nullable:true})
  bio?:string
  
  @Field({nullable:true})
  location?:string
  
  @Field({nullable:true})
  image?:string

  @Field({nullable:true})
  profile_image?:string
  
  @Field()
  count_followers:number

  @Field()
  count_media:number

  @Field()
  count_tweets:number
  
  @Field()
  count_following:number
  
  @Field()
  is_follow:boolean
  
  @Field()
  createdAt:string
}
