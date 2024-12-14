"use client"

import Logo from "@/components/Logo"
import GoogleAuthBtn from "@/components/auth/GoogleAuthBtn";
import CreateAccountBtn from "@/components/auth/createAccountBtn";
import SigninBtn from "@/components/auth/SigninBtn";

export default function Home() {
  return (
   
    <section className="min-h-screen grid grid-cols-1 md:grid-cols-2 grid-rows-[min-content_1fr] md:grid-rows-1 gap-2  p-10 ">
        <div className="justify-center md:flex p-5 items-center ">
             <Logo className="relative w-20 md:w-1/2  aspect-square"/>
        </div>
        <div className="flex flex-col px-5 gap-3 md:justify-center items-start ">
          <div className="text-gray-200 bg ">
            <h1 className="text-5xl font-extrabold leading-[200%] md:leading-[300%]">Happening now </h1>
            <h4 className="text-2xl font-bold">Join today.</h4>
          </div>
          <div className="">
             <GoogleAuthBtn/>
             <p className="w-full h-10 relative flex items-center justify-center">
                <span  className="absolute bg-black p-2 ">or</span>
                <span className="w-full h-[1px] bg-zinc-700"></span>
             </p>
            <CreateAccountBtn/>
            <SigninBtn/>
          </div>
         
        </div>
    </section>
    );
}
