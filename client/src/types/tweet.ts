
import { Usertype } from "./user"

export type MediaType = {
    url: string
    type: string
    width: number
    height: number
    public_id:string

}
export type TweetType = {
    user: Usertype
    _id: string
    type: string
    title?: string
    count_reposts: number
    count_replaies: number
    count_likes: number
    is_bookmarks:boolean
    is_like:boolean
    media?: MediaType[]
    createdAt: number
    original_tweet:TweetType
}