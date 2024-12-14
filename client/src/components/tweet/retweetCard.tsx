"use client"

import { TweetType } from "@/types/tweet"
import Image from "next/image"
import PostAuthorDetails from "./PostAuthorDetails";
import MediaContainer from "./mediaContainer";

function retweet({ content }: { content?: TweetType }) {

  return (
    <div className=" bg-black cursor-pointer border-solid border-[1px] border-zinc-700 rounded-lg p-2 w-full space-y-2 mb-2 ">

      <div className="flex gap-2">
        <div className="w-10 h-10 relative bg-zinc-600 rounded-full overflow-hidden">
          {content?.user.image && (
            <Image
              src={content?.user.image}
              width={40}
              height={40}
              alt="author image"
              className="object-cover object-center" />
          )}
        </div>
        <h4 className="">{content?.title}</h4>
        <PostAuthorDetails
          user_id={content?.user._id}
          user={content?.user}
          createdAt={content?.createdAt}
        />
        {content?.title && <p className="text-sm">{content?.title}</p>}
      </div>
      <MediaContainer media={content?.media} />

    </div>
  )
}

export default retweet