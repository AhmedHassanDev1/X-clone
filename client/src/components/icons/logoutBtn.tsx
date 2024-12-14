"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { SlLogout } from "react-icons/sl";
import { Logout } from '@/utils/cookies';
function logoutBtn() {
  let router = useRouter()

  let handleClick = async () => {
    await Logout()
    router.push('/')
    console.log('logout');


  }
  return (
    <button
      className='icon'
      onClick={handleClick}>
      <SlLogout />
    </button>
  )
}

export default logoutBtn