import { gql } from "@apollo/client";

let GlobalFragment =gql`
 fragment UserPart on UserEntity {
     _id
     name 
     email
     image
 }
 
 fragment MediaPart on Media{
            url
            type
            width
            height
            public_id
 }  

 fragment TweetPart on TweetEntity {
         _id
        title
        type
        createdAt

 }

`
export default GlobalFragment