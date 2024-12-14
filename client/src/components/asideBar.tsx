"use client"
import { useSelector } from "react-redux"
import Logo from "./Logo";
import ProfileIcon from "./icons/profileIcon";
import { asideBarItmes } from "@/constants/lists";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileRoute } from "@/constants/router";
import { RootState } from "@/interfaces/redux";
import CurrentUserImage from "./user/currentUserImage";
import CreateTweetBtn from "./button/createTweet";
import LogoutBtn from "./icons/logoutBtn";
function asideBar() {

  let currentUser = useSelector((state: RootState) => state?.currentUser)

  let pathname: string = usePathname()

  return (
    <aside className="sticky top-0 h-screen p-3 hidden  sm:flex flex-col justify-between items-center ">
      <div className="flex flex-col items-center gap-7">
        <Logo className="relative w-6 h-6 " />
        {asideBarItmes.map(el => {
          return <Link key={el.url} href={el.url}>
            <el.icon active={pathname.startsWith(el.url)} />
          </Link>
        })}
        <Link href={profileRoute + '/' + (currentUser?.user ? currentUser?.user._id : '')}>
          <ProfileIcon active={pathname.startsWith(profileRoute)} />
        </Link>
        <CreateTweetBtn className='w-10 h-10 rounded-full flex justify-center items-center text-xl bg-white text-black'/>
        <LogoutBtn/>
      
      </div>
      <div className="">
        <div className="w-12 h-12">
          <CurrentUserImage />
        </div>
      </div>
    </aside>
  )
}

export default asideBar