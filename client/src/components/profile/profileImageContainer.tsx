"use client"

import Image from "next/image"
import ImageDialog from "../imageDialog"
import { useRef  } from "react"

function profileImageContainer({ url }: { url: string | undefined }) {
  let dialogRef = useRef(null)
   
  return (
    <>
      <div className="profile-image">
        {url && (
          <Image src={url} fill alt="profile-image" className="hover:opacity-60  cursor-pointer object-cover"
            onClick={() => (dialogRef.current as HTMLDialogElement | null)?.showModal()}
          />
        )}
      </div>
      <ImageDialog ref={dialogRef} url={url} />

    </>
  )
}

export default profileImageContainer