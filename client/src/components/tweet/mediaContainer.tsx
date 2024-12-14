"use client"

import { MediaType } from "@/types/tweet"
import Image from "next/image"


function mediaContainer({media}:{media?:MediaType[]}) {
    return (
        <div className="media-container gap-1 ">
            {media?.map(el => {
                return <div key={el.public_id} className="relative rounded-lg overflow-hidden">
                    {el.type == 'image' ? (
                        <Image  src={el.url} objectFit="cover" fill alt="tweet image" />
                    ) : <video controls >
                         <source src={el.url} type="video/mp4" />
                        </video>}
                </div>
            })}

        </div>
    )
}

export default mediaContainer