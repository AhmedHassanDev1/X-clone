"use client"
import { PiBookmarkSimpleFill } from "react-icons/pi";
import { PiBookmarkSimpleLight } from "react-icons/pi";
function bookmarksIcon({active=false}:{active:boolean}) {
  return (
    <div className="icon">
       {active?(
          <PiBookmarkSimpleFill/>
       ):(
        <PiBookmarkSimpleLight/>
       )}
    </div>
  )
}

export default bookmarksIcon