import { gql } from "@apollo/client";

export let getCurrentUserQuery = gql`
    query Me {
      me {
          _id
          name
          image
      }
  }

  `
export let getUserDetailsQuery = gql`
  query User_details($id:String!) {
   user: user_details(id: $id) {
        ...UserPart
        bio
        location
        createdAt
        profile_image
     
        count_followers
        count_following
    }
}
`

export let getProfileDetailsQuery = gql`
  query User_details($id:String!) {
   user: user_details(id: $id) {
        count_media
        count_tweets
    }
}
` 