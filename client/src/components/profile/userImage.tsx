"use client"

import Image from "next/image"
import ImageDialog from "../imageDialog"
import { useRef } from "react"
function userImage({ url }: { url: string | undefined }) {
    let dialogRef = useRef(null)
    return (
        <>
            <div
                className="user-image"
            >
                {url && (
                    <Image
                        src={url}
                        alt="user image"
                        width={150}
                        height={150}
                        className="hover:opacity-60  cursor-pointer object-center object-cover"
                        onClick={() => (dialogRef.current as HTMLDialogElement | null)?.showModal()}
                    />
                )}
            </div>
            <ImageDialog ref={dialogRef} url={url} />
        </>
    )
}

export default userImage