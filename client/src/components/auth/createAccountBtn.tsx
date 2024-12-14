"use client"
import { useRef } from "react"
import SignupForm from "@/components/forms/signupForm"
function createAccountBtn() {
  let dialogRef = useRef<HTMLDialogElement | null>(null)
  return (
    <>
      <dialog ref={dialogRef} className=""  >
        <div className="w-full h-full fixed inset-0 bg-[#cfcfcf36] ">

          <SignupForm closeDialog={()=>dialogRef.current?.close()} />
        </div>
        
      </dialog>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="w-80  bg-sky-500 rounded-full py-2 px-10 font-medium text-lg"
      >
        create account
      </button>
    </>
  )
}

export default createAccountBtn