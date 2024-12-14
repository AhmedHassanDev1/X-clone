
import { SigninPayload, registerPayload } from "@/types/auth"
import axios from "axios"

export let SignUp=async(payload:registerPayload):Promise<void>=>{
    let url=process.env.NEXT_PUBLIC_AUTH_API+"register"
    
   await axios.post(url,payload,{
        withCredentials:true,
        headers: {
            'Content-Type': 'application/json',            
          },
    })
 
}


export let SignIn=async(payload:SigninPayload):Promise<void>=>{
    let url=process.env.NEXT_PUBLIC_AUTH_API+"login"
    
    await axios.post(url,payload,{
        withCredentials:true,
        headers: {
            'Content-Type': 'application/json',            
          },
    })

}

