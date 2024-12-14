import { Field, Int, ObjectType } from "@nestjs/graphql";
import { UserEntity } from "src/user/entity/user.entity";

@ObjectType()
export class Media {
    @Field()
    url: string
    @Field()
    public_id:string 
    
    @Field()
    type: string

    @Field(type => Int)
    width: string

    @Field(type => Int)
    height: string
}
@ObjectType()
export class TweetEntity {
    @Field()
    _id: string
    
    @Field(type=>UserEntity)
    user:UserEntity
    
    @Field(()=>TweetEntity,{nullable:true})
    original_tweet:TweetEntity

    @Field({ nullable: true })
    title: string
    
    @Field()
    is_like:boolean

    @Field()
    is_bookmarks:boolean
    
    @Field()
    is_repost:boolean
    
    
    @Field()
    type: string

    @Field(type => Int)
    count_replaies: number

    @Field(type => Int)
    count_reposts: number

    @Field(type => Int)
    count_likes: number

    @Field()
    createdAt: string

    @Field(()=>[Media],{nullable:true})
    media: Media[]

    
}
