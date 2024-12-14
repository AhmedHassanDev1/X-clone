import { Schema ,Prop , SchemaFactory   } from "@nestjs/mongoose";
import mongoose from "mongoose"
import { User } from "./user";
import { Tweet } from "./tweet";

@Schema({timestamps:true})
export class Follow{
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    follower:User
    
    @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
    following:User
    
    
}

export let followSchema=SchemaFactory.createForClass(Follow)

