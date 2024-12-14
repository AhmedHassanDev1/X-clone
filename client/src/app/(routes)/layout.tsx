"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "@/store/current_user";
import { AppDispatch } from "@/store/store";
import Loading from "@/components/loading";
import BottomBar from "@/components/bottomBar";
import { RootState } from "../../interfaces/redux"
import AsideBar from "@/components/asideBar"

function layout({ children }: { children: React.ReactNode }) {
  let dispatch = useDispatch<AppDispatch>()
  let currentUser = useSelector((state: RootState) => state?.currentUser)

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [])


  if (currentUser?.loading) {
    return <div className="w-full h-screen">
      <Loading />
    </div>
  }
  return (
    <div className="w-full  min-h-screen flex justify-center ">
      <AsideBar />
      {children}
      <BottomBar />
    </div>
  )
}

export default layout