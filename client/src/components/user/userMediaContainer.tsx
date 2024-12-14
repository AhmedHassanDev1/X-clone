"use client"

import { MediaType } from "@/types/tweet"
import Image from "next/image"

type TweetContainerProps = {
  content?: MediaType[]
  
  message?: {
    title?: string
    subTitle?: string
  }
}

function userMediaContainer({  content, message }: TweetContainerProps) {
  
  
  if (!content?.length && message) {
    return <div className="w-full p-3 flex flex-col items-center">
      <div className=" max-w-96">
        <h3 className="text-white text-3xl font-bold">{message?.title}</h3>
        <p className="text-zinc-500 text-sm">{message?.subTitle}</p>
      </div>
    </div>
  }
  
  
  return (
    <div className="grid grid-cols-3 gap-1 p-2">
      {content?.map((el: any) => {
        
          return <div key={el.public_id} className="relative  aspect-square rounded-lg overflow-hidden">
            {el.type == 'image' ? (
              <Image src={el.url} objectFit="cover" fill alt="tweet image" />
            ) : <video controls >
              <source src={el.url} type="video/mp4" />
            </video>}
          </div>
      
      })}
    </div>
  )
}

export default userMediaContainer