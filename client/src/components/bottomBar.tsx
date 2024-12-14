"use client"
import MaxWidthWrapper from "./maxWidthWrapper"
import ProfileIcon from "./icons/profileIcon";
import { asideBarItmes } from "@/constants/lists";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profileRoute } from "@/constants/router";
import { RootState } from "@/interfaces/redux";
import CurrentUserImage from "./user/currentUserImage";
import { useSelector } from "react-redux"

function bottomBar() {
    let currentUser = useSelector((state: RootState) => state?.currentUser)

    let pathname: string = usePathname()

    return (

        <div className="flex sm:hidden fixed bottom-0 p-4 ">
            <MaxWidthWrapper>
                <div className="w-full p-2 border-solid border-t-zinc-600 border-t-2 flex justify-around items-center gap-7">
                    {asideBarItmes.map(el => {
                        return <Link key={el.url} href={el.url}>
                            <el.icon active={pathname.startsWith(el.url)} />
                        </Link>
                    })}
                    <Link href={profileRoute + '/' + (currentUser?.user ? currentUser?.user._id : '')}>
                        <ProfileIcon active={pathname.startsWith(profileRoute)} />
                    </Link>
                </div>
            </MaxWidthWrapper>
        </div>
    )
}


export default bottomBar