"use client"
import { FaRetweet } from "react-icons/fa6";

function RepostBtn() {
  
  return (
    <div className="flex items-center  text-zinc-500 hover:text-emerald-600 ">
      <button className="text-xl p-1 hover:bg-[#70feb246] rounded-full">
        <FaRetweet />
      </button>

    </div>
  )
}

export default RepostBtn