import { gql } from "@apollo/client";


export let AddLikeMutation=gql`
  mutation Add_like($tweet_id:String!) {
    add_like(tweet_id: $tweet_id) {
        user_id
        tweet_id
        type
    }
}
`
export let removeLikeMutation=gql`
  mutation Remove_like($tweet_id:String!) {
    remove_like(tweet_id: $tweet_id)
}
`


export let AddbookmarksMutation=gql`
  mutation Bookmarks($tweet_id:String!) {
    bookmarks(tweet_id: $tweet_id) {
        user_id
        tweet_id
        type
    }
}
`

export let removebookmarksMutation=gql`
  mutation Unbookmarks($tweet_id:String!) {
    unbookmarks(tweet_id: $tweet_id) {
        user_id
        tweet_id
        type
    }
}
`