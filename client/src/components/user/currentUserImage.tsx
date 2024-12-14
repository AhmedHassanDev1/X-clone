"use client"
import { UseSelector, useSelector } from "react-redux"
import { RootState } from "@/interfaces/redux"
import Image from "next/image"
function currentUserImage() {
    let { user } = useSelector((state: RootState) => state.currentUser)
    return (
        <div className="w-full h-full bg-zinc-600 relative rounded-full overflow-hidden cursor-pointer flex justify-center items-center">
            {user?.image && (
                <Image src={user?.image} width={200} height={200}  alt='user image'  className="object-cover object-center" />
            )}
        </div>
    )
}

export default currentUserImage