"use client"

import { RootState } from "@/interfaces/redux";
import { TweetType } from "@/types/tweet"
import { BiRepost } from "react-icons/bi";
import { useSelector } from "react-redux";
import PostAuthorDetails from "./PostAuthorDetails";
import Image from "next/image";
import Link from "next/link";
import InterActionsBar from "./interActionsBar";
import { profileRoute } from "@/constants/router";
import RetweetCard from "./retweetCard";
import MediaContainer from "./mediaContainer";
function TweetCard({ content }: { content?: TweetType }) {
  let { user } = useSelector<RootState>(state => state.currentUser)
  let isRepost = (!content?.title && !content?.media && content?.type === 'retweet' && content.user._id === user?._id)
  let isQuote = (content?.title && content?.type === 'retweet')


  return (
    <div className=" relative  ">
      {isRepost && (
        <div className="">
          <BiRepost />
          <span>You reposted</span>
        </div>

      )}
      <div
        
        className="relative hover:bg-[#2e2e2e4d]  grid p-2 gap-x-2 grid-cols-[min-content_1fr] ">
        {/* Auther Image */}
        <Link
          onClick={(e) => e.stopPropagation()}
          href={profileRoute + '/' + content?.user._id}
          className="w-12  row-span-2 ">
          <div className="w-12 h-12 relative grid place-content-center bg-zinc-600 rounded-full overflow-hidden">
            {content?.user.image && (
              <Image
                src={content?.user.image}
                width={50}
                height={50}
                alt="author image"
                className="object-cover object-center" />
            )}
          </div>
        </Link>
        <div className="">
          {/* Post Author Details */}
          <PostAuthorDetails
            user_id={content?.user._id}
            user={content?.user}
            createdAt={content?.createdAt}
          />

          {/* tweet Details */}
          {/* Tweet Title */}
          {content?.title && <p className="">{content?.title}</p>}

          {/* Tweet Media */}
          <MediaContainer media={content?.media || []} />
          {/* Retweet */}
          {content?.original_tweet && <RetweetCard content={content?.original_tweet} />}
          {/* Tweet interactions */}
          <InterActionsBar content={content} />
        </div>
      </div>
    </div>
  )
}

export default TweetCard