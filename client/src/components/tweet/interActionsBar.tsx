"use client"

import { TweetType } from "@/types/tweet"
import BookmarksBtn from "../button/bookmarksBtn"
import LikeBtn from "../button/likeBtn"
import ReplayBtn from "../button/replayBtn"
import RepostBtn from "../button/RepostBtn"
function interActionsBar({ content }: { content: TweetType }) {
  return (
    <div className="flex justify-between">
      <ReplayBtn />
      <RepostBtn />
      <LikeBtn count_likes={content.count_likes} tweet_id={content?._id} is_like={content?.is_like} />
      <BookmarksBtn tweet_id={content?._id} is_bookmark={content?.is_bookmarks} />
    </div>
  )
}

export default interActionsBar