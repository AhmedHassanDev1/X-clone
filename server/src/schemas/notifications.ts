import { Schema ,Prop , SchemaFactory   } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { User } from "./user";
import { Tweet } from "./tweet";

@Schema({timestamps:true})
export class Notification{
    @Prop({enum:['like','repost','replay'],required:true})
    type:string
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Tweet'})
    tweet:Tweet

}

export let notificationSchema=SchemaFactory.createForClass(Notification)
