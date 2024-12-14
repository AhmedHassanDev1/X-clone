import { Schema ,Prop , SchemaFactory   } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { User } from "./user";


@Schema()
class Media {
    @Prop({required:true})
    public_id:string

    @Prop({required:true})
    url:string

    @Prop({required:true,enum:['image','gif','video']})
    type:string
    
    @Prop()
    width:number

    @Prop()
    height:number

}

@Schema({timestamps:true})
export class Tweet{

    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"User"})
    user:User
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:"Tweet"})
    original_tweet:Tweet
    
    @Prop()
    title:string
    
    @Prop({required:true,default:'tweet',enum:['tweet','retweet','replay']})
    type:string
    
    
    @Prop({type:Date,default:Date.now()})
    schedule:Date
    
    @Prop({type:[Media]})
    media:Media[]
    
    @Prop({default:0})
    count_likes:number
    
    @Prop({default:0})
    count_reposts:number

    @Prop({default:0})
    count_replaies:number
    
    @Prop({default:false})
    is_delete:boolean
    
    @Prop([
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          likedAt: { type: Date, default: Date.now },
        },
      ])
      likes: { user: User; likedAt: Date }[];
    
      @Prop([
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          bookmarkedAt: { type: Date, default: Date.now },
        },
      ])
      bookmarks: { user: User; bookmarkedAt: Date }[];

      @Prop([
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          repostedAt: { type: Date, default: Date.now },
        },
      ])
      reposts: { user: User; repostedAt: Date }[];
 
    
}  

export let tweetSchema=SchemaFactory.createForClass(Tweet)
