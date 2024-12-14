import React from 'react'

function loading() {
  return (
    <div className='w-full h-full flex justify-center items-center'>
       <span className='w-6 h-6 rounded-full border-solid border-4 border-[#3a96ff30] border-t-sky-500 border-l-sky-500 animate-spin  '></span>     
   </div>
  )
}

export default loading