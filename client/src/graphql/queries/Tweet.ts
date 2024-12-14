import { gql } from "@apollo/client";

export let getUserTweets=gql`
query Get_user_Tweet($id:String!,$limit:Int,$offset:Int) {
   data: get_user_Tweet(id:$id,limit:$limit,offset:$offset) {
        ...TweetPart
        count_replaies
        count_reposts
        count_likes
        is_bookmarks
        is_like
        original_tweet{
         ...TweetPart
         media {
           ...MediaPart
         }
         user{
            ...UserPart
         }
        }
        media {
           ...MediaPart
        }
        user{
            ...UserPart
        }
    }
}
`

export let getBookmarks=gql`
query Get_bookmarks($limit:Int,$offset:Int) {
   data: get_bookmarks(limit:$limit,offset:$offset) {
        ...TweetPart
        count_replaies
        count_reposts
        count_likes
        is_bookmarks
        is_like
        original_tweet{
         ...TweetPart
         media {
           ...MediaPart
         }
         user{
            ...UserPart
         }
        }
        media {
           ...MediaPart
        }
        user{
            ...UserPart
        }
    }
}
`

export let getLikes=gql`
query Get_Likes($limit:Int,$offset:Int) {
   data: get_likes(limit:$limit,offset:$offset) {
        ...TweetPart
        count_replaies
        count_reposts
        count_likes
        is_bookmarks
        is_like
        original_tweet{
         ...TweetPart
         media {
           ...MediaPart
         }
         user{
            ...UserPart
         }
        }
        media {
           ...MediaPart
        }
        user{
            ...UserPart
        }
    }
}
`



export let gethomeTweets=gql`
query get_Tweets($limit:Int,$offset:Int) {
   data: get_Tweets(limit:$limit,offset:$offset) {
        ...TweetPart
        count_replaies
        count_reposts
        count_likes
        is_bookmarks
        is_like
        original_tweet{
         ...TweetPart
         media {
           ...MediaPart
         }
         user{
            ...UserPart
         }
        }
        media {
           ...MediaPart
        }
        user{
            ...UserPart
        }
    }
}
`

export let getUserMedia=gql`
 query Get_media($id: String!, $limit: Int, $offset: Int) {
    data: get_media(id: $id, limit: $limit, offset: $offset) {
        url
        public_id
        type
        width
        height
    }
}
`