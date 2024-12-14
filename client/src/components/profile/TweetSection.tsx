"use client"
import { useEffect, useState } from "react"
import Navigationbar from "../navigationbar"
import { getUserTweets, getLikes, getUserMedia } from "@/graphql/queries/Tweet"
import { getProfileDetailsQuery } from "@/graphql/queries/User"
import { useParams } from "next/navigation"
import InfiniteScroll from "../infiniteScroll"
import TweetContainer from "../tweet/TweetContainers"
import TweetCard from "../tweet/TweetCard"
import UserMediaContainer from "../user/userMediaContainer"
import { useQuery } from "@apollo/client"
import { subTitleheader } from "@/app/(routes)/(group1)/profile/[id]/page"
import { formatCompactNumber } from "@/utils/Format/number"


function TweetSection() {
  let params: { id: string } = useParams()
  let variables = {
    id: params?.id,
    limit:10

  }
  let { data } = useQuery(getProfileDetailsQuery, { variables })
  let [activeTab, setActiveTab] = useState<string>('posts')


  useEffect(() => {
    switch (activeTab) {
      case 'posts':
        subTitleheader(`${formatCompactNumber(data?.user?.count_tweets)} Posts`)
        break;
      case 'replaies':
        subTitleheader(`${formatCompactNumber(data?.user?.count_tweets)} Posts`)
        break;
      case 'media':
        subTitleheader(`${formatCompactNumber(data?.user?.count_media)} photos & videos`)
        break;
      case 'likes':
        subTitleheader(`${formatCompactNumber(data?.user?.count_tweets)} Like`)
        break;

    }


  }, [data, activeTab])

  return (
    <section className="">
      <Navigationbar
        list={['posts', 'replaies', 'media', 'likes']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {activeTab === 'posts' && (
        <InfiniteScroll
          query={getUserTweets}
          initialVariables={variables}
        >
          <TweetContainer>
            <TweetCard />
          </TweetContainer>
        </InfiniteScroll>
      )}
      {activeTab === 'replaies' && (
        <InfiniteScroll
          query={getUserTweets}
          initialVariables={variables}
        >
          <TweetContainer>
            <TweetCard />
          </TweetContainer>
        </InfiniteScroll>
      )}

      {activeTab === 'media' && (
        <InfiniteScroll
          query={getUserMedia}
          initialVariables={variables}
        >
          <UserMediaContainer
           
            message={{
              title: 'Lights, camera … attachments!',
              subTitle: 'When you post photos or videos, they will show up here.'
            }} />


        </InfiniteScroll>
      )}
      {activeTab === 'likes' && (
        <InfiniteScroll
          query={getLikes}
        
        >
          <TweetContainer
            message={{
              title: 'You don’t have any likes yet',
              subTitle: 'Tap the heart on any post to show it some love. When you do, it’ll show up here.'
            }}>
            <TweetCard />
          </TweetContainer>
        </InfiniteScroll>
      )}
    </section>
  )
}

export default TweetSection