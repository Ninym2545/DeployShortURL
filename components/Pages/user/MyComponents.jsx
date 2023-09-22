"use client"
import React, { useState } from 'react'
import InputShortener from './InputShortener ';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loadding';

const MyComponents = () => {
    const session = useSession();
    const router = useRouter();
    if (session.status === "loading") {
      return <Loading/>;
    }
  
    if (session.status === "unauthenticated") {
      router?.push("/");
    }
  return (
    <>
    <InputShortener/>
    </>
  )
}

export default MyComponents