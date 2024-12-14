import { Schema ,Prop , SchemaFactory   } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { User } from "./user";
import { Tweet } from "./tweet";

@Schema({timestamps:true})
export class Likes{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    user:User
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Tweet'})
    tweet:Tweet
    
}

export let likesSchema=SchemaFactory.createForClass(Likes)

