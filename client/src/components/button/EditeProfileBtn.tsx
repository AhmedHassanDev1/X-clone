"use client"

import { useRef } from "react"
import EditeProfileForm from "../forms/editeProfileForm"
import { Usertype } from "@/types/user"

function EditeUserBtn({ userDetails,refetch }: { userDetails: Usertype,refetch:()=> Promise<any> }) {
  let dialogRef = useRef<HTMLDialogElement | null>(null)
  return (
    <>
      {userDetails && (
        <dialog ref={dialogRef}>
          <div className="fixed inset-0 bg-[#b5b5b51a] flex justify-center items-center overflow-hidden ">
            <EditeProfileForm refetch={refetch} closeForm={() => dialogRef.current?.close()} userDetails={userDetails} />
          </div>
        </dialog>
      )}
      <div className="">
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="ring-1 ring-zinc-600 px-4 py-2 hover:bg-[#f7f7f71e] rounded-full">
          Edite profile
        </button>
      </div>
    </>
  )
}

export default EditeUserBtn