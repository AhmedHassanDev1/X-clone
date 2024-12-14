"use client"
import InfiniteScroll from "@/components/infiniteScroll"
import TweetContainer from "@/components/tweet/TweetContainers"
import TweetCard from "@/components/tweet/TweetCard"
import { getBookmarks } from "@/graphql/queries/Tweet"
import BackBtn from "@/components/button/backBtn"
function page() {
  return (
    <div className="min-h-screen border-x-[1px] border-solid border-zinc-700 ">
      <header className="header">
        <BackBtn />
        <h1 className="font-medium text-lg">Bookmarks</h1>
      </header>
      <InfiniteScroll
        query={getBookmarks}
      >
        <TweetContainer
          message={{
            title: 'Save posts for later',
            subTitle: 'Bookmark posts to easily find them again in the future.'
          }}
        >
          <TweetCard />
        </TweetContainer>
      </InfiniteScroll>
    </div>
  )
}

export default page