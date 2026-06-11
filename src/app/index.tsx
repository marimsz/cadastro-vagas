import { useEffect } from "react";
import { router } from "expo-router";
import { auth } from "@/firebase/firebaseConfing";

export default function Index() {
    
  useEffect(()=>{
    const unsubcribe = auth.onAuthStateChanged((user)=>{
      if (user) {
        router.replace("/home")
      } else{
        router.replace("/login")
      }
    })

  return unsubcribe
},[])
}
