
import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class NotificationsEntity {

    @Field()
    user_id:string

    @Field()
    tweet_id:string 

    @Field({nullable:true})
    type?:string 
}