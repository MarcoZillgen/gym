"use client"

import { useRouter } from "next/navigation"

export default function Statistics() {
  const router = useRouter()
  return <>

      Not yet implemented, sry :(
    <button type="button" onClick={()=>{router.replace("/")}}>Back</button>
  </>
}
