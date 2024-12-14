
export type currentUserType={
   status:string,
   loading:boolean,
   error:{
    message:string|null,
    statusCode:number|null
   }
    user:{
    _id:string|null
    name:string|null
    image:string|null
   }
}

export type Usertype={
   _id:string
   __typename:string
   name:string
   email?:string
   image?:string
   bio?:string
   location?:string
   createdAt?:Date
   profile_image?:string
   count_tweets:number|undefined
   count_following:number|undefined
   count_followers:number|undefined
   count_media:number
}

export type userEditeType={
   name:string
   bio:string
   location:string
}