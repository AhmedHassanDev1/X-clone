"use client"

import { useRouter } from "next/navigation"
import { IoIosArrowRoundBack } from "react-icons/io";


function backBtn() {
    let router=useRouter()

  return (
    <div className="icon" onClick={()=>router.back()}>
       <IoIosArrowRoundBack />
    </div>
  )
}

export default backBtn