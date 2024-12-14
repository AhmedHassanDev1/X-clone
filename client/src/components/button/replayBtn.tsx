"use client"
import { BiMessageRounded } from "react-icons/bi";
function replayBtn() {
    return (
       <div className="flex items-center text-xl text-zinc-600 hover:text-sky-500 ">
         <button className='hover:bg-[#29bdf842] p-1 rounded-full'>
            <BiMessageRounded />
        </button>
        <p>{1}</p>
       </div>
    )
}

export default replayBtn