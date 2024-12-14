"use server"

import { cookies } from "next/headers"
let get_cookies=async(name:string):Promise<{name:string,value:string}|undefined>=>{
  
  let cookie=await cookies()
  return cookie.get(name);

}

export let Logout=async():Promise<void>=>{
  let cookie=await cookies()
  cookie.delete('access_token')
}
export default get_cookies