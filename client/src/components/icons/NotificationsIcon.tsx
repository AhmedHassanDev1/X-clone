"use client"
import { IoNotificationsSharp } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";


function NotificationsBtn({active=false}:{active:boolean}) {
  return (
    <div className="icon">
       {active?(
          <IoNotificationsSharp/>
       ):(
        <IoNotificationsOutline/>
       )}
    </div>
  )
}

export default NotificationsBtn