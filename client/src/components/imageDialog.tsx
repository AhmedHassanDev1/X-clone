"use client"
import { useImperativeHandle, useRef, forwardRef, Ref, HTMLAttributes } from "react"
import Image from "next/image"
import { IoCloseSharp } from "react-icons/io5";
import { TurnOffWindowScrolling, TurnOnWindowScrolling } from "@/utils/scroll";
function imageDialog({ url }: { url: string | undefined }, ref: Ref<unknown> | undefined) {
    let dialogRef = useRef<HTMLDialogElement | null>(null)
    useImperativeHandle(ref, () => {
        return {
            close() {
                return dialogRef.current?.close()
            },
            showModal() {
                TurnOffWindowScrolling()
                dialogRef.current?.showModal()
            },

        }
    }, [])
    return (
        <>
            <dialog 
                 ref={dialogRef} 
                 onClick={() => dialogRef.current?.close()}
             
                 onClose={TurnOnWindowScrolling} 
                 >
                <div className="inset-0 fixed flex justify-center items-center">
                    {url &&
                        (
                            <Image src={url} width={500} height={500} alt="image" />
                        )}

                </div>
            </dialog>

        </>
    )
}

export default forwardRef(imageDialog)

