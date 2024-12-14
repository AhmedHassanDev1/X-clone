"use client"

import { useRef, useState } from "react";
import CreateTweetForm from "../forms/createTweetForm";
import { FiFeather } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
function createTweet({ ...props }) {
  let [open, setOpne] = useState()
  let dialogRef = useRef<HTMLDialogElement | null>(null)
  let handleClick = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }
  return (
    <>
      <dialog ref={dialogRef} >
        <div className="fixed inset-0 flex justify-center items-start bg-[#f4f4f41a]">
          <div className=" mt-0 md:mt-20 bg-black p-2 rounded-lg">
            <button 
            onClick={()=>dialogRef.current?.close()} 
            className=" text-white text-xl"
            >
              <IoClose />
              </button>
            <CreateTweetForm />
          </div>
        </div>
      </dialog>
      <button onClick={handleClick} {...props}>
        <FiFeather />
      </button>
    </>
  )
}

export default createTweet