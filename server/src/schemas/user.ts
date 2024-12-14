import { Schema ,Prop , SchemaFactory   } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { Tweet } from "./tweet";

Schema()
class Image{
    @Prop({required:true})
    public_id:string

    @Prop({required:true})
    url:string
    
    @Prop()
    width:number

    @Prop()
    height:number
}

@Schema({timestamps:true})
export class User {
   
    @Prop({required:true}) 
    name:string

    @Prop({required:true,unique:true})
    email:string
    
    @Prop()
    password:string

    @Prop()
    bio:string
    
    @Prop()
    location:string

    @Prop({type:Date})
    date_birth:Date
    
    @Prop()
    image:Image

    @Prop()
    profile_image:Image
   
    @Prop({required:true,default:'user',enum:['admin','user']})
    user_type:string
   
   @Prop({default:0}) 
   count_message_notifications:number
    
   @Prop({default:0}) 
   count_notifications:number
   
   @Prop({default:0}) 
   count_tweets:number

   @Prop({default:0}) 
   count_followers:number

   @Prop({default:0}) 
   count_following:number
  
   @Prop({default:0}) 
   count_media:number

}

export let userSchema=SchemaFactory.createForClass(User)
