"use client"

import { Usertype } from "@/types/user"
import { useEffect, useState } from "react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import Link from "next/link"
import { profileRoute } from "@/constants/router"
import { HiDotsHorizontal } from "react-icons/hi";
type PostAuthorDetailsProps = {
  user_id: string | undefined
  user: Usertype | undefined
  createdAt: number | undefined
}
function PostAuthorDetails({ user_id, user, createdAt }: PostAuthorDetailsProps) {
  dayjs.extend(relativeTime)
  let [date, setDate] = useState(dayjs(new Date(new Date(Number(createdAt)))).fromNow())
  useEffect(() => {
    let Interval = setInterval(() => {
      setDate(dayjs(createdAt as number).fromNow())
    }, 1000)
    return () => {
      clearInterval(Interval)
    }
  }, [])

  return (
    <div className="flex-1 flex justify-between items-center  font-medium">
      <div className="flex gap-2 items-center ">
        <Link href={profileRoute + '/' + user_id} className="text-[16px] hover:underline cursor-pointer">{user?.name}</Link>
        <span className="text-sm text-zinc-600">{date}</span>
      </div>
      <HiDotsHorizontal />
    </div>
  )
}

export default PostAuthorDetails