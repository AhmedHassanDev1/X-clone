"use client"

import { useRef } from "react"
import SigninForm from "../forms/signinForm"
"../forms/signinForm"
function SigninBtn() {
  let dialogRef = useRef<HTMLDialogElement | null>(null)

  return (
    <>
      <dialog ref={dialogRef} className=""  >
        <div className="w-full h-full fixed inset-0 bg-[#cfcfcf36] ">

          <SigninForm closeDialog={() => dialogRef.current?.close()} />
        </div>

      </dialog>
      <div className="mt-10 space-y-3 ">
        <h3 className="font-medium text-lg">Already have an account?</h3>
        <button
          onClick={() => dialogRef.current?.showModal()}
          className="w-80 py-2 px-10  rounded-full ring-2 ring-gray-600 hover:bg-[#7fa1ef2b]">
          Sign in
        </button>
      </div>
    </>
  )
}

export default SigninBtn