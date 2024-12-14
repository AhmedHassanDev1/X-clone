"use client"
import MaxWidthWrapper from "@/components/maxWidthWrapper";
import CreateTweetForm from "@/components/forms/createTweetForm";
import Navigationbar from "../../../../components/navigationbar"
import { useState } from "react";
import InfiniteScroll from "@/components/infiniteScroll";
import { gethomeTweets } from "@/graphql/queries/Tweet";
import TweetContainer from "@/components/tweet/TweetContainers";
import TweetCard from "@/components/tweet/TweetCard";

function page() {
  let [activeTab, setActiveTab] = useState<string>('for you')

  return (
    <MaxWidthWrapper>
      <div className="w-full p-2 border-x-[1px] border-solid border-zinc-700 hidden md:inline-block ">
        <CreateTweetForm />


        <InfiniteScroll
          query={gethomeTweets}
          initialVariables={{ limit: 20 }}
        >
          <TweetContainer>
            <TweetCard />
          </TweetContainer>
        </InfiniteScroll>

      </div>
    </MaxWidthWrapper>
  )
}

export default page