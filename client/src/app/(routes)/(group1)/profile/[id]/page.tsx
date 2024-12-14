"use client"

import { useParams } from 'next/navigation'
import ProfileImageContainer from "@/components/profile/profileImageContainer"
import UserImage from "@/components/profile/userImage"
import Loading from "@/components/loading"
import BackBtn from "@/components/button/backBtn"
import EditeProfileBtn from "@/components/button/EditeProfileBtn"

import { getUserDetailsQuery } from "@/graphql/queries/User"
import { ReactiveVar, makeVar, useQuery, useReactiveVar } from "@apollo/client"
import { useSelector } from "react-redux"
import { RootState } from "@/interfaces/redux"
import { Usertype } from "@/types/user"
import { IoLocationOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { formatCompactNumber } from '@/utils/Format/number'
import Link from 'next/link'

import TweetSection from '@/components/profile/TweetSection'

export let subTitleheader:ReactiveVar<string>=makeVar('')

function page() {
  
  let subTitle=useReactiveVar(subTitleheader)
  let params = useParams()
  let { user } = useSelector((state: RootState) => state?.currentUser)
  let {data, loading, refetch } = useQuery(getUserDetailsQuery, {
    variables: { id: params?.id },    
  })
  let userDetails:Usertype=data?.user
  
   

  return (

    <div className="min-h-screen border-x-[1px] border-solid border-zinc-700 ">
      <header className="header">
        <BackBtn />
        <div className="">
          {loading && <div className=" w-7"><Loading /></div>}
          <h3 className="font-bold text-xl">{userDetails?.name}</h3>
          {subTitleheader()&&<h6 className='text-zinc-600 font-medium text-sm'>{subTitleheader()}</h6>}
        </div>
      
      </header>
      {/* user details */}
      <section className="w-full">
        <div className="relative">
          <ProfileImageContainer url={userDetails?.profile_image} />
          <UserImage url={userDetails?.image} />
        </div>

        {/* Edite user button */}
        <div className="p-3 flex justify-end">
          {user?._id === params?.id ? (
            <EditeProfileBtn refetch={refetch} userDetails={userDetails} />
          ) : (
            <>
            </>
          )}
        </div>

        {/* User details */}
        {!loading ? (
          <div className="p-3">
            <h3 className=" font-bold text-xl leading-[300%] ">{userDetails?.name}</h3>
            <p className=" text-sm font-medium">{userDetails?.bio}</p>
            <div className="flex gap-2 items-center  text-zinc-500 my-2">
              {/* User location */}
              {userDetails?.location && <p className="flex gap-1 items-center">
                <IoLocationOutline className=" text-lg" />
                {userDetails?.location}
              </p>}
              {/* User Jointed Date 📅 */}
              <p className="flex gap-1 items-center">
                <FaRegCalendarAlt className="text-sm" />
                {` Joined 
                  ${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(userDetails?.createdAt)}
                  ${new Intl.DateTimeFormat('en-US', { year: "numeric" }).format(userDetails?.createdAt)}`}
              </p>
            </div>
            {/* Profile details */}
            <div className="space-x-3">
              <Link
                 className=' text-white hovor:underline  ' 
                  href={'/follower/followers' + '/' + params?.id}>
                {`${formatCompactNumber(userDetails?.count_following)} `}
                <span className="text-zinc-600">following</span>
              </Link>
              <Link href={'/follower/followers' + '/' + params?.id}>
                {`${formatCompactNumber(userDetails?.count_followers)} `}
                <span className="text-zinc-600">followers</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full py-16 ">
            <Loading />
          </div>
        )}
      </section>
      {/* user Tweets */}
     <TweetSection/>
    </div>

  )
}

export default page