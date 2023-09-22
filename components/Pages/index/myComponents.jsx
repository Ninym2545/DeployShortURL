"use client"
import React, { useState } from 'react'
import InputShortener from './InputShortener '
import LinkResult from './LinkResult '
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Loading from '@/app/loadding'

const MyComponents = () => {

    const session = useSession();
    const router = useRouter();
    if (session.status === "loading") {
      return <Loading/>;
    }
  
    if (session.status === "authenticated") {
      router?.push("/user");
    }
    const [inputValue, setInputValue] = useState("");
    return (
        <>
            <InputShortener setInputValue={setInputValue} />
            <LinkResult inputValue={inputValue}/>
        </>
    )
}

export default MyComponents