import { IsOptional } from "class-validator";

export class CreateTweetDTO{
     @IsOptional()
     title?:string
     
     @IsOptional()
     type?:string
     
     @IsOptional()
     original_tweet_id?:string

     @IsOptional()
     schedule?:string
}