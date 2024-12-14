"use client"


function maxWidthWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-screen max-w-xl  ">
        {children}
    </div>
  )
}

export default maxWidthWrapper