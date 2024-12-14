"use client"
import Image from "next/image"

function googleAuthBtn() {
  return (
    <button className="w-80 rounded-full py-2 px-10 bg-white text-black text-lg font-medium flex gap-2 items-center justify-center">
      <Image src={'/google-logo.png'} width={20} height={20} alt="google-logo"/>
      sign in with google
    </button>
  )
}

export default googleAuthBtn