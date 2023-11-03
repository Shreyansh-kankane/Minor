"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { useSession } from "next-auth/react";

async function updateIsOnline(isOnline: boolean,email: string | undefined){

  try {
    const res = await fetch('/api/changeOnline', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:email,isOnline:isOnline})
    })
    // console.log(res);
    
  } catch (error) {
    console.log(error)
  }
   

}

const useOnlineMode = () => {
  const [isOnline, setIsOnline] = useLocalStorage("isOnline", true);
  const {data: session} = useSession();

  useEffect(() => {
    async function changeOnline(){
      await updateIsOnline(isOnline,session?.user?.email);
    }
    changeOnline();
  }, [isOnline]);

  return [isOnline, setIsOnline];
};

export default useOnlineMode;
