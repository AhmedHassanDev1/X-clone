"use client"

import React from 'react'

type navigationBarProps = {
    activeTab: string
    list: string[]
    setActiveTab: any
}

function navigationbar({ activeTab, setActiveTab, list }: navigationBarProps) {
    return (
        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] border-solid border-transparent border-b-zinc-700 border-2  overflow-auto'>
            {list.map(el => {
                return <div
                    onClick={() => setActiveTab(el)}
                    key={el}
                    className={`flex justify-center py-3 cursor-pointer hover:bg-zinc-800`}
                >
                    <span className={`${activeTab === el ? 'before:bg-sky-500' : 'before:bg-transparent'} relative first-letter:uppercase before:absolute before:-bottom-3 before:inset-x-0 before:rounded-full before:h-1`}>
                        {el}
                    </span>
                </div>
            })}
        </div>
    )
}

export default navigationbar