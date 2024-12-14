"use client"

import Image from "next/image"

function logo({className}:{className:string}) {

 return (
    <div className={className}>
      <Image src={'/white-logo.png'} fill alt="logo"/>
    </div>
  )
}

export default logo