"use client"

import { TweetType } from "@/types/tweet"
import { ReactNode, cloneElement } from "react"

type TweetContainerProps = {
  content?: TweetType[]
  children: any
  message?: {
    title?: string
    subTitle?: string
  }
}

function TweetContainer({ children, content, message }: TweetContainerProps) {

  if (!content?.length && message) {
    return <div className="w-full p-3 flex flex-col items-center">
      <div className="max-w-96 space-y-4">
        <h3 className="text-white text-3xl font-bold">{message?.title}</h3>
        <p className="text-zinc-500 text-sm">{message?.subTitle}</p>
      </div>
    </div>
  }
  return (
    <div className="divide-y-[1px] divide-zinc-700">
      {content?.map((el: any) => {
        return cloneElement(children, { content: el, key: el._id })
      })}
    </div>
  )
}

export default TweetContainer