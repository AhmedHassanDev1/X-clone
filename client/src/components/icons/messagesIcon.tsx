"use client"

import { MdEmail } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
function messagesIcon({active=false}:{active:boolean}) {
  return (
    <div className="icon">
       {active?(
          <MdEmail/>
       ):(
        <HiOutlineMail/>
       )}
    </div>
  )
}

export default messagesIcon